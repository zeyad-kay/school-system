const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const student = require("./queries/students");
const parent = require("./queries/parent");
const db = require("../src/db/models/index");
const { mapToJSON } = require("../src/queries/utlis");

// Enable live reload for Electron too
// require("electron-reload")(__dirname);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
  app.quit();
}
let mainWindow;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "views/js/preload.js")
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "views/login.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
let counts = 0;
ipcMain.on("login", function (event, args) {
  console.log(args[0], args[1]);
  // load Students 
  switch (args[0]) {
  case "1":
    if (args[1] === "1234") {
      mainWindow.loadFile(path.join(__dirname, "views/Expenses.html"));
    }
    break;
  case "2":
    if (args[1] === "2468") {
      mainWindow.loadFile(path.join(__dirname, "views/affairsHome.html"));
    } else
      break;
  }
});
ipcMain.on("sendStudentIdToMain", (err, studentId) => {
  // load screen
  mainWindow.loadFile(path.join(__dirname, "views/loading.html"));
  const getStudentData = async (Id) => {
    let studentData = await student.getStudentsByColumnMultipleVals("StudentId", [Id]);
    studentData = studentData[0];
    let fatherData = null;
    let motherData = null;
    let resData = null;
    // get nationalty 
    let nationalities = await db["Nationality"].findAll();
    let nationality = await db["Nationality"].findOne({
      where: {
        NationalityId: studentData.StudentNationalityId
      }
    });
    nationality = nationality.dataValues;
    nationalities = mapToJSON(nationalities);
    // get fatherData 
    let StudentFatherId = studentData.StudentFatherId;
    if (StudentFatherId) {
      fatherData = parent.getParentById(StudentFatherId);
    }
    // get fatherData 
    let StudentMotherId = studentData.StudentMotherId;
    if (StudentMotherId) {
      motherData = parent.getParentById(StudentMotherId);
    }
    // resp data 
    let StudentResponsibleId = studentData.StudentResponsibleId;
    if (StudentResponsibleId) {
      resData = parent.getParentById(StudentResponsibleId);
    }
    // 
    let data = {
      ...studentData,
      nationality,
      nationalities,
      ...fatherData,
      ...motherData,
      ...resData
    };
    // get absent data 
    console.log("here");
    return data;
  };
  getStudentData(Number(studentId)).then(data => {
    mainWindow.loadFile(path.join(__dirname, "views/updateStudent.html"));
    mainWindow.webContents.on("did-finish-load", function cb() {
      mainWindow.webContents.send("getStudentDataFromMain", data);
      counts++;
      console.log(counts);
      mainWindow.webContents.removeListener("did-finish-load", cb);
    });
  });
});