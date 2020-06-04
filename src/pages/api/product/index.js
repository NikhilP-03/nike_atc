import getAbck from '../../../util/abck';

const generateAbck = () => {
  return new Promise(async (resolve, reject) => {
    let gotAbck = null;
    let foundAbck = false;
    let attempts = 50;
    while (!foundAbck && attempts > 0) {
      try {
        gotAbck = await getAbck('https://nike.com/');
        if (!gotAbck.includes('==')) {
          foundAbck = true;
          resolve(gotAbck);
        } else {
          attempts--;
        }
      } catch (e) {
        attempts--;
      }
    }
  });
};

const add = async ({ abck, accessToken, skuId, slug, sku }) => {
  return fetch(
    'https://api.nike.com/buy/carts/v2/CA/NIKE/NIKECOM?modifiers=VALIDATELIMITS,VALIDATEAVAILABILITY',
    {
      headers: {
        accept: 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        appid: 'com.nike.commerce.nikedotcom.web',
        authorization: `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'content-type': 'application/json; charset=UTF-8',
        pragma: 'no-cache',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-b3-spanname': 'CiCCart',
        'x-b3-traceid': '503fbb93-ca98-4273-902d-066de44ffab0',
        cookie: `_abck=${abck}`,
      },
      referrerPolicy: 'no-referrer-when-downgrade',
      // TODO: update /ca/ to your country
      body: `[{"op":"add","path":"/items","value":{"itemData":{"url":"/ca/t/${slug}/${sku}"},"skuId":"${skuId}","quantity":1}}]`,
      method: 'PATCH',
      mode: 'cors',
    },
  );
};
export default async function productHandler(req, res) {
  switch (req.method) {
    case 'POST':
      const { abck, accessToken, skuId, slug, sku } = JSON.parse(req.body);
      const abckCookie = await generateAbck();
      const response = await add({
        abck: abckCookie,
        accessToken,
        skuId,
        slug,
        sku,
      });
      if (response.status > 300) {
        res.statusCode = response.status;
        const err = await response.text();
        res.send({
          errors: [
            {
              message: response.statusText,
              code: response.status,
              err,
            },
          ],
        });
        return;
      }
      const data = await response.json();
      return res.send(data);
    default:
      res.send(500);
  }
}
