# How To

1. Clone and download the repo

```
$ git clone git@github.com:romeldris/nike_atc.git
```

2. Run npm install

```
$ cd nike_atc
$ npm run install
```

3. Start next

```
$ npm run dev
```

4. Navigate to
   http://localhost:3000/product/[COUNTRY]/[STYLE]
   Country = ca | us | au , Style is the style color at the end of the nike url that looks something like 553558-611
   
5. You will see:
![image](https://user-images.githubusercontent.com/778153/82655015-6c452980-9bd6-11ea-8584-16a1d77a44c6.png)

6. Get your accessToken (make sure you're signed into nike.com)

7. Generate a _\_abck_ cookie by clicking around and using this bookmarklet to grab it: 
https://gist.githubusercontent.com/romeldris/d598cf71c8fa07de14c38f3f70ac79a5/raw/00a686b37ab87487ee44c6377ee85d3ea68abb7c/abckgen.txt
   1. Create a new bookmark
   2. Paste content of that into the URL
   ![image](https://user-images.githubusercontent.com/778153/82655306-d5c53800-9bd6-11ea-93d5-157d3977e5a4.png)

8. Validate the _\_abck_ cookie by checking to see if there is no == at the end of the cookie

9. Click add for your size of choice

