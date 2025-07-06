// api/points.js   (Node.js 18 默认运行时)
export default async function handler(req, res) {
  const { user = '' } = req.query;                                   // 1
  if (!/^0x[a-fA-F0-9]{40}$/.test(user)) return res.status(400).json({ error: 'bad address' }); // 2

  const url = `https://kx58j6x5me.execute-api.us-east-1.amazonaws.com/linea/getUserPointsSearch?user=${user.toLowerCase()}`; // 3

  try {
    const r = await fetch(url, { timeout: 10_000 });                 // 4
    const body = await r.text();                                     // 5

    res.setHeader('Access-Control-Allow-Origin', '*');               // 6
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate'); // 7
    res.status(r.status).send(body);                                 // 8
  } catch (e) {
    res.status(502).json({ error: e.message || 'upstream error' });  // 9
  }                                                                  // 10
}
