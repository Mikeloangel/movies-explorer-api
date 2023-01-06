// cors options
module.exports.corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://lumiere.nomoredomains.club',
    'https://lumiere.nomoredomains.club',
    'http://filmoteka.nomoredomains.club',
    'https://filmoteka.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders:
    [
      'Content-Type',
      'origin',
      'Authorization',
      'Accept',
      'Access-Control-Allow-Headers',
      'credentials',
      'withCredentials',
    ],
  credentials: true,
};
