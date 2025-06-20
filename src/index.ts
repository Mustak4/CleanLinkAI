import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'CleanLinkAI backend is running!' });
});

// Zod schema for link creation
const createLinkSchema = z.object({
  url: z.string().url(),
  customSlug: z.string().min(6).max(8).regex(/^[a-zA-Z0-9]+$/).optional(),
  title: z.string().optional(),
  description: z.string().optional()
});

// Helper: generate random slug
function generateSlug(length = 6) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// POST /api/shorten
app.post('/api/shorten', async (req, res) => {
  try {
    const parsed = createLinkSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: 'Invalid input', error: parsed.error.errors });
    }
    const { url, customSlug, title, description } = parsed.data;

    // Check for existing slug if custom
    let slug = customSlug;
    if (slug) {
      const exists = await prisma.link.findUnique({ where: { slug } });
      if (exists) {
        return res.status(409).json({ success: false, message: 'Slug already taken' });
      }
    } else {
      // Generate unique slug
      let unique = false;
      let attempts = 0;
      while (!unique && attempts < 10) {
        slug = generateSlug();
        const exists = await prisma.link.findUnique({ where: { slug } });
        if (!exists) unique = true;
        attempts++;
      }
      if (!unique) {
        return res.status(500).json({ success: false, message: 'Could not generate unique slug' });
      }
    }

    // Insert into DB
    const link = await prisma.link.create({
      data: {
        slug,
        originalUrl: url,
        cleanUrl: url, // TODO: sanitize if needed
        title,
        description
      }
    });
    return res.json({ success: true, message: 'Shortlink created', data: link });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// GET /api/resolve/:slug
app.get('/api/resolve/:slug', async (req, res) => {
  const { slug } = req.params;
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid slug' });
  }
  try {
    const link = await prisma.link.findUnique({ where: { slug } });
    if (!link) {
      return res.status(404).json({ success: false, message: 'Link not found' });
    }
    // Increment click count
    await prisma.link.update({ where: { slug }, data: { clicks: { increment: 1 } } });
    // Optionally, create a Click event here
    return res.json({ success: true, message: 'Link resolved', data: { url: link.cleanUrl } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// GET /api/stats/:slug
app.get('/api/stats/:slug', async (req, res) => {
  const { slug } = req.params;
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid slug' });
  }
  try {
    const link = await prisma.link.findUnique({ where: { slug }, include: { clickEvents: true } });
    if (!link) {
      return res.status(404).json({ success: false, message: 'Link not found' });
    }
    // Daily aggregates (last 30 days)
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);
    const dailyClicks: Record<string, number> = {};
    for (const click of link.clickEvents) {
      const date = click.timestamp.toISOString().split('T')[0];
      if (!dailyClicks[date]) dailyClicks[date] = 0;
      dailyClicks[date]++;
    }
    const dailyClicksArr = Object.entries(dailyClicks).map(([date, clicks]) => ({ date, clicks }));
    return res.json({
      success: true,
      data: {
        totalClicks: link.clicks,
        dailyClicks: dailyClicksArr,
        // Optionally add referrers, countries, etc.
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
}); 