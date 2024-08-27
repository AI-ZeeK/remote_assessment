import { Request, Response, Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import multer from 'multer';

export class DefaultRoute implements Routes {
  public path = '/';
  public router = Router();

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  upload = multer({ storage: this.storage });
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, (req, res) => {
      res.status(200).json('HELLO!!!..., YOU FOUND ME');
    });
    this.router.post(`${this.path}api/uploadfile`, this.upload.single('file'), (req: Request & { file: any }, res: Response, next) => {
      try {
        console.log(req.file, 4322);
        const file = req.file ? req.file.filename : null;
        console.log(file, 243);
        res.status(201).json({ data: `${process.env.API_URL}/uploads/${file}`, message: 'file uploaded successfully' });
      } catch (error) {
        next(error);
      }
    });
  }
}
