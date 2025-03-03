import express, { Request, Response } from 'express';
import userRoutes from "./userRoutes"
import schoolRoutes from "./schoolRoutes"
import classRoutes from "./classRoutes"
import sectionRoutes from "./sectionRoutes"
import subjectRoutes from "./subjectRoutes"
import examRoutes from "./examRoutes"
import classroomRoutes from "./classroomRoutes"
import classExamRoutes from "./classExamRoutes"
import { userRouter } from '../../api/user/userRouter';
import { roleRouter } from '../../api/roles/roleRouter';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', (req: Request, res: Response) => {
    res.send("Hello World!")
  });


// router.use('/users', userRoutes);
router.use("/user", userRouter) //one route for registering the user.Dont add multiple routes for different roles
router.use("/role", roleRouter) //for adding roles in the DB

router.use('/schools', schoolRoutes);
router.use('/class', classRoutes);
router.use('/section', sectionRoutes);
router.use('/subject', subjectRoutes);
router.use('/exam', examRoutes);
router.use('/classroom', classroomRoutes);
router.use('/classexam', classExamRoutes);

export default router;
