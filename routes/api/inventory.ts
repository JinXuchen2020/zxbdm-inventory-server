import express, { Request, Response } from 'express';
import fs from 'fs';
import { buffer } from 'stream/consumers';
import { promisify } from 'util';
const router = express.Router();

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const readJsonFile = async (filePath: string) => {
  let path = filePath;
  if (fs.existsSync(filePath)) {    
    const data = await readFile(path, 'utf8');    
    return JSON.parse(data);
  }
  else {
    return null;
  }
};

const writeJsonFile = async (filePath: string, data: string) => {
  const dataStr = JSON.stringify(data); 
  await writeFile(filePath, dataStr, 'utf8');
};

router.get('/marketNames/:keyword', async (req : Request, res : Response) => {
  const keyword = req.params.keyword;
  const fileName =  '下拉框.txt'
  const filePath = `C://${keyword}/${fileName}`;
  let data : any = '';
  if(fs.existsSync(filePath)){
    data = await readFile(filePath, 'utf8');
  }
  res.json({
    data: data,
    code: 200,
    success: true,
    message: 'Successfully'
  });
});

router.post('/marketNames/:keyword', async <T> (req : Request, res : Response) => {
  const keyword = req.params.keyword;
  const fileName =  '下拉框.txt'
  const filePath = `C://${keyword}/${fileName}`;
  const data = req.body as { MarketNames: string };
  if(!fs.existsSync(filePath)){
    fs.mkdirSync(`C://${keyword}`, { recursive: true });
  }
  await writeFile(filePath, data.MarketNames.toString(), 'utf8');
  res.json({
    data: null,
    code: 200,
    success: true,
    message: 'Successfully'
  });
});

router.get('/:keyword', async <T> (req : Request, res : Response) => {
  const keyword = req.params.keyword;
  const fileName =  '库存.json'
  const filePath = `C://${keyword}/${fileName}`;
  const data = await readJsonFile(filePath);
  res.json({
    data: data as T,
    code: 200,
    success: true,
    message: 'Successfully'
  });
});

router.post('/:keyword', async <T> (req : Request, res : Response) => {
  const keyword = req.params.keyword;
  const fileName =  '库存.json'
  const filePath = `C://${keyword}/${fileName}`;
  if(!fs.existsSync(filePath)){
    fs.mkdirSync(`C://${keyword}`, { recursive: true });
  }
  const data = req.body;
  await writeJsonFile(filePath, data);
  res.json({
    data: null,
    code: 200,
    success: true,
    message: 'Successfully'
  });
});

router.get('/caches/:keyword', async <T> (req : Request, res : Response) => {
  const keyword = req.params.keyword;
  const fileName =  '本地缓存.json'
  const filePath = `C://${keyword}/${fileName}`;
  const data = await readJsonFile(filePath);
  res.json({
    data: data as T,
    code: 200,
    success: true,
    message: 'Successfully'
  });
});

router.post('/caches/:keyword', async <T> (req : Request, res : Response) => {
  const keyword = req.params.keyword;
  const fileName =  '本地缓存.json'
  const filePath = `C://${keyword}/${fileName}`;
  if(!fs.existsSync(filePath)){
    fs.mkdirSync(`C://${keyword}`, { recursive: true });
  }
  const data = req.body;
  await writeJsonFile(filePath, data);
  res.json({
    data: null,
    code: 200,
    success: true,
    message: 'Successfully'
  });
});


export default router;
