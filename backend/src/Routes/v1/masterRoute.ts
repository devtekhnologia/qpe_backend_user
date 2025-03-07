import express, { Request, Response } from 'express';
import { roleRouter } from '../../api/roles/roleRouter';
import { authRouter } from '../../api/auth/authRouter';
import { classRouter } from '../../api/class/classRoutes';
import { classroomRouter } from '../../api/classroom/classroomRoutes';
import { sectionRouter } from '../../api/section/sectionRoutes';
import { subjectRouter } from '../../api/subject/subjectRoutes';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', (req: Request, res: Response) => {
    res.send("Hello World!")
  });


// router.use('/users', userRoutes);
router.use("/auth", authRouter) //one route for registering the user.Dont add multiple routes for different roles
router.use("/role", roleRouter) //for adding roles in the DB

router.use('/class', classRouter);
router.use('/section', sectionRouter);
router.use('/subject', subjectRouter);
router.use('/classroom', classroomRouter);

export default router;
