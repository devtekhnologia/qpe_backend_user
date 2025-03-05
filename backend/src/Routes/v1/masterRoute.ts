import express, { Request, Response } from 'express';
import schoolRoutes from "../../api/school/schoolRoutes"
import classRoutes from "../../api/class/classRoutes"
import sectionRoutes from "../../api/section/sectionRoutes"
import subjectRoutes from "../../api/subject/subjectRoutes"
import classroomRoutes from "../../api/classroom/classroomRoutes"
import { roleRouter } from '../../api/roles/roleRouter';
import { authRouter } from '../../api/auth/authRouter';

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', (req: Request, res: Response) => {
    res.send("Hello World!")
  });


// router.use('/users', userRoutes);
router.use("/auth", authRouter) //one route for registering the user.Dont add multiple routes for different roles
router.use("/role", roleRouter) //for adding roles in the DB

router.use('/schools', schoolRoutes);
router.use('/class', classRoutes);
router.use('/section', sectionRoutes);
router.use('/subject', subjectRoutes);
router.use('/classroom', classroomRoutes);

export default router;
