SELECT "StudentName", "GradeName","ClassName","JobName" FROM "ParentJob"
JOIN "Student" ON "Student"."StudentResponsibleId" = "ParentJob"."ParentId"
JOIN "StudentClass" ON "Student"."StudentId" = "StudentClass"."StudentId"
JOIN "Class" ON "StudentClass"."ClassId" = "Class"."ClassId"
JOIN "Grade" ON "Class"."GradeId" = "Grade"."GradeId"
JOIN "Stage" ON "Grade"."StageId" = "Stage"."StageId" 
JOIN "Job"   ON "Job"."JobId" = "ParentJob"."ParentJobId"
WHERE "ParentJob"."ParentJobId" = '6'