SELECT "respMother"."StudentName","StudentNationalId","ResponsibleId","fatherId","MotherId"
From (
    SELECT "resp"."StudentName","ResponsibleId","MotherId","resp"."StudentNationalId","resp"."StudentId"
    from (
        SELECT "StudentName",
          "ParentNationalId" AS "ResponsibleId","StudentNationalId","StudentId"
        FROM "Student"
          JOIN "Parent" ON "Student"."StudentResponsibleId" = "Parent"."ParentId"
      ) AS "resp"
      JOIN (
        SELECT "StudentName",
          "ParentNationalId" AS "MotherId"
        FROM "Student"
          JOIN "Parent" ON "Student"."StudentMotherId" = "Parent"."ParentId"
      ) AS "mother" ON "resp"."StudentName" = "mother"."StudentName"
  ) as "respMother"
  JOIN (
    SELECT "StudentName",
      "ParentNationalId" AS "fatherId"
    FROM "Student"
      JOIN "Parent" ON "Student"."StudentFatherId" = "Parent"."ParentId"
  ) AS "father" ON "respMother"."StudentName" = "father"."StudentName" 
  JOIN "StudentClass" ON "respMother"."StudentId" = "StudentClass"."StudentId"
  JOIN "Class" ON "StudentClass"."ClassId" = "Class"."ClassId"
  JOIN "Grade" ON "Class"."GradeId" = "Grade"."GradeId"
  JOIN "Stage" ON "Grade"."StageId" = "Stage"."StageId"
  WHERE "Stage"."StageId" = '1'