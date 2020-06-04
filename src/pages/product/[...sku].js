import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Product = () => {
  const router = useRouter();
  const [abck, setAbck] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [product, setProduct] = useState(null);
  const [errors, setErrors] = useState([]);
  const [sku, setSku] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    if (router && Object.keys(router.query).length > 0) {
      setCountry(router.query.sku[0]);
      setSku(router.query.sku[1]);
    }
  }, [router]);

  useEffect(() => {
    async function fetchData() {
      if (sku && country && !product) {
        const res = await fetch(
          `https://4skezi4eth.execute-api.us-east-1.amazonaws.com/dev/product`,
          {
            method: 'POST',
            cors: 'no-cors',
            body: JSON.stringify({
              sku,
              country,
            }),
          },
        );
        if (res.status > 300) {
          setErrors(data.errors);
        }
        const data = await res.json();
        if (!product) setProduct(data);
      }
    }

    fetchData();
  }, [sku, country]);

  const atc = async (skuId) => {
    setErrors([]);
    if (!abck && !accessToken) {
      return alert('enter valid tokens');
    }
    const res = await fetch(`/api/product`, {
      method: 'POST',
      body: JSON.stringify({
        abck,
        accessToken,
        skuId,
        slug: product.slug,
        sku,
      }),
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
      return;
    }
    window.open(`https://www.nike.com/${country}/en/cart`, '_blank');
  };

  return product ? (
    (() => {
      const { title, squarishURL, skuInfos, url, slug } = product;
      return (
        <div>
          {errors.length > 0 &&
            errors.map((error) => (
              <div style={{ color: 'red', fontWeight: 'bold' }}>
                {error.message} {error.code} {error.err}
              </div>
            ))}
          accessToken:
          <textarea
            placeholder="set access token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          />
          <a href="" />
          <br />
          {title} {url}
          <img src={squarishURL} width={100} />
          {skuInfos.map(
            ({ nikeSize, level, skuId, available }) =>
              available && (
                <div
                  style={{
                    margin: '5px',
                    padding: '10px',
                  }}>
                  {nikeSize} Level: {level}
                  <button onClick={() => atc(skuId)}>Add</button>
                </div>
              ),
          )}
        </div>
      );
    })()
  ) : (
    <div>Please enter a valid one</div>
  );
};
export default Product;
