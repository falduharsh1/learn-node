const url = require('url')

console.log(url.parse("https://www.amazon.in/Daikin-Inverter-Display-Technology-MTKL50U/dp/B0BK1KS6ZD/ref=sr_1_1_sspa?_encoding=UTF8&content-id=amzn1.sym.58c90a12-100b-4a2f-8e15-7c06f1abe2be&dib=eyJ2IjoiMSJ9.LpujZ4uISPUK8sa_6yNGVTLp2_seTR9samDUOPD7O27xh9VGEzSOMma2wDtFfWy1FEtNnfHvEI3OrlfEvuF7nM5oB6HkmrptCJFznyf02U0cKmjvc5e6ozV1D_nRVEgFErk9TTGwJaMwAGUbLLpIa9saJgaUZRrWn6pvpPvDho0mKpXQW4BAw-FSe7Ygn_4db-oKbZ-WjL9r9i0T-3KdagFT_chCTc5sTU0rxHvyHJdHf0uP6GODxImernNNbzVlBHnt134YM7XxuqsFTFQi1tDn2NdUK3oaMNPH24Z5oqE.jolpzLiY4D30OigD4xdUo4nTZOUZMpzN7qP9eszq4l0&dib_tag=se&pd_rd_r=b49c44f7-576f-424e-a3f5-81c2cdbc69f8&pd_rd_w=rkXUD&pd_rd_wg=Shwqh&pf_rd_p=58c90a12-100b-4a2f-8e15-7c06f1abe2be&pf_rd_r=CBJ4TPHKNRDH8SEP3Z3Y&qid=1737516231&refinements=p_85%3A10440599031&rps=1&s=kitchen&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3Nl&psc=1",));

console.log(url.format({
    protocol: 'https',
    hostname: 'example.com',
    pathname: '/some/path',
    query: {
      page: 1,
      format: 'json',
    },
  }))

console.log(url.resolve('http://harsh.com/', '/india'));
