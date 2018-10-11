# vote-banner

Add a voter registration CTA to your website with the following snippet:

```
<script src="https://vote.speaklouder.org/r1/banner.min.js" async></script>
```

See https://vote.speaklouder.org for latest usage instructions and other details.

![Screenshot](https://vote.speaklouder.org/images/example.png)

## Development

Banner code is contained entirely in `r1/banner.js`.  `yarn run pack` will minify the code!

## Deployment

All the code in this project is static, hosted on S3.  Cloudflare is used to set cache policies and a Cloudflare Worker is used to display the banner only for people based in the US.
