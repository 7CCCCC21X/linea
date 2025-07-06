// Vercel 自动把 /api/points 映射到这个文件
export default async function handler(req, res) {
  const { user } = req.query;            // /api/points?user=0x...
  if (!user) {
    return res.status(400).json({ error: 'Missing user param' });
  }

  try {
    const upstream = await fetch(
      `https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/linea/getUserPointsSearch?user=${user}`
    );
    if (!upstream.ok) throw new Error(upstream.statusText);
    const data = await upstream.json();

    // 若想允许别家域名用你这个代理，再放开下面一行
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (e) {
    res.status(502).json({ error: 'Upstream fetch failed', detail: e.message });
  }
}
