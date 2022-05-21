/**
 * 题目1：编写一个 People 类，使其的实例具有监听事件、触发事件、解除绑定功能。（实例可能监听多个不同的事件，也可以去除监听事件）
 * @param {string} event
 * @param {Function} callback
 * @param {string} param
 */

class People {
  constructor(name) {
    this.name = name;
  }

  on(event, callback) {
    (this.events[event] || (this.events[event] = [])).push(callback);
  }

  off(event, callback) {
    let eventArr = this.events[event];
    for (let i = eventArr.length - 1; i >= 0; i--) {
      if (callback === eventArr[i]) {
        eventArr.splice(i, 1);
      }
    }
  }

  emit(event, param) {
    let eventArr = this.events[event];
    eventArr.forEach((callback) => {
      callback(param);
    });
  }

  sayHi() {
    console.log(`Hi, I am ${this.name}`);
  }
}

/* 以下为测试代码 */
const say1 = (greeting) => {
  console.log(`${greeting}, nice meeting you.`);
};

const say2 = (greeting) => {
  console.log(`${greeting}, nice meeting you, too.`);
};

const jerry = new People("Jerry");
jerry.sayHi();
// => 输出：'Hi, I am Jerry'

jerry.on("greeting", say1);
jerry.on("greeting", say2);

jerry.emit("greeting", "Hi");
// => 输出：'Hi, nice meeting you.' 和 'Hi, nice meeting you, too'

jerry.off("greeting", say1);
jerry.emit("greeting", "Hi");
// => 只输出：'Hi, nice meeting you, too'

/**
 * 题目2：完成 sleep 函数，可以达到下面的效果：
 * @param {number} duration 需要 sleep 的间隔时间
 */

const sleep = (duration) => {
  return new Promise((resolve) => {
    let timer = setTimeout(() => {
      resolve(timer);
    }, duration);
  });
};

const anyFunc = async () => {
  console.log("123"); // 输出 123
  await sleep(300); // 暂停 300 毫秒
  console.log("456"); // 输出 456，但是距离上面输出的 123 时间上相隔了 300 毫秒
};

// anyFunc();

/**
 * 题目3：完成 deepGet 函数，给它传入一个对象和字符串，字符串表示对象深层属性的获取路径，可以深层次获取对象内容：
 * @param {Object} obj 传入的需要深度遍历的对象
 * @param {string} prop 需要深度遍历的字符串
 * @return {Boolean} 是否能深度遍历字符串的值
 */

 const deepGet = (obj, prop) => {
    let splitArr = prop.split(".")
    splitArr.reduce((obj, i) => {console.log(obj,i)})
    let res = splitArr.pop()

    for (var i in obj) {
        console.log(i)
      if (typeof obj[i] === "object" && !Array.isArray(obj[i])) {
        return deepGet(obj[i], prop);
      } else if (Array.isArray(obj[i])) {
          // TODO:判断是否为数组
          console.log(splitArr)
          return undefined;
      } else {
        if (obj[i] === obj[res]) {
          return obj[res];
        }
      }
    }
    return undefined;
  };

/** 以下为测试代码 */
deepGet(
  {
    school: {
      student: { name: "Tomy" },
    },
  },
  "school.student.name"
); // => 'Tomy'

deepGet(
  {
    school: {
      students: [{ name: "Tomy" }, { name: "Lucy" }],
    },
  },
  "school.students[1].name"
); // => 'Lucy'

// 对于不存在的属性，返回 undefined
deepGet({ user: { name: "Tomy" } }, "user.age"); // => undefined
deepGet({ user: { name: "Tomy" } }, "school.user.age"); // => undefined

console.log(
  deepGet(
    {
      school: {
        student: { name: "Tomy" },
      },
    },
    "school.student.name"
  )
);
