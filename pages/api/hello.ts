// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

interface ErrorMessage {
  message: string
}

let data = {
  'render_json': {
    'laravel': [
      'response()->json($data);',
    ],
    'symfony': [
      '$this->renderJson($data);',
    ],
  }
};

let errorUnkownUsecase : ErrorMessage = {
  'message': 'Unknown usecase',
};

let errorFrom : ErrorMessage = {
  'message': 'Error lang param',
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200;

  const query: Object = req.query;

  // validation
  let usecaseParam : string = query['usecase'];
  if (usecaseParam == '') {
    res.json(errorUnkownUsecase)
    res.statusCode = 400;
    return;
  }


  const lang : boolean =  query.hasOwnProperty('framework');
  if (!lang) {
    res.json(errorFrom)
    res.statusCode = 400;
    return;
  }


  let usecase = data[usecaseParam] || '';
  if (usecase === '') {
    res.json(errorUnkownUsecase)
    res.statusCode = 400;
    return;
  }

  let framework = query['framework'];

  res.json(data[usecaseParam][framework]);
}
