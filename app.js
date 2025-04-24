import mysql2 from "mysql2";
import { DataTypes, Sequelize, Op } from "sequelize";

let sql = new Sequelize("geetansh", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

function auth() {
  try {
    sql.authenticate();
    console.log("db authnticated");
  } catch (err) {
    console.log("error while authenticating");
  }
}

auth();

let dept = sql.define(
  "Dept",
  {
    deptId: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    deptName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

let emp = sql.define(
  "Emp",
  {
    empId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },

    empName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doj: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    age: {
      defaultValue: 18,
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

emp.belongsTo(dept, { foreignKey: "deptId" }),
  dept.hasMany(emp, { foreignKey: "deptId" });

sql
  .sync({ alter: true })
  .catch((err) => console.log("error while connecting db"))
  .then(console.log("connected"));

let data = await emp.findAll({
  where: {
    age: {
      [Op.between]: [15, 22],
    },
    empId:12
  },
});
console.log(data);

// let dept1 = dept.create({
//     deptName:"Open Source",
// })

// let dept2 = dept.create({
//     deptName:"Dev Ops",
// })

// let dept3 = dept.create({
//     deptName:"AI",
// })

// let dept4 = dept.create({
//     deptName:"Dot Net",
// })
