---
title: JS 如何避免全局变量污染
categories: 前端
tags:
  - JavaScript
---

### JS 如何避免全局变量污染

1. ### 加上个人标识符

2. ### 匿名函数

   如果是 A 写的变量跟 B 写的变量名字一样，那么就会造成变量冲突，此时每个人之间都可以使用匿名函数来开发

   ```html
   <!doctype html>
   <html>
   	<head>
   		<meta charset="UTF-8">
   		<title>使用匿名函数解决变量作用域问题</title>
   		<script>
   			(function() {
   				//程序员a写的代码
   				var a = 123;
   				alert(a);
   			})();
   		</script>
   	</head>
   
   	<body>
   
   		<script>
   			(function() {
   				//程序员b写的代码
   				var a = 89;
   				alert(a);
   			})();
   		</script>
   
   
   		<script>
   			(function() {
   				//程序员c写的代码
   				alert(a);
   			})();
   		</script>
   
   		这里每个程序员定义了自己的匿名函数，在不同的函数中定义变量，这个变量就是一个局部变量。 <br />
   		用匿名函数将脚本包起来，可以有效控制全局变量，避免冲突。
   
   	</body>
   </html>
   ```

   但是如果是不同人之间要共享一个变量的话，如上代码就用不了了

   解决方案： 将多个全局变量包装在一起，使用一个 hash 全局变量，类似于一个集合一样的用。

3. ### 使用命名空间解决问题

为解决如上问题，可以使用 命名空间的方法

```html
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>使用hash变量作为全局变量</title>

		<script>
			//hash全局变量
			var GLOBAL = {};
		</script>

		<script>
			(function() {
				//程序员a写的代码
				var a = 123;
				alert(a);
			})();
		</script>
	</head>

	<body>

		<script>
			(function() {
				//程序员b写的代码:操作全局GLOBAL变量
				GLOBAL.a = 89;
				alert("程序员b:" + GLOBAL.a);
			})();
		</script>


		<script>
			(function() {
				//程序员c写的代码访问的就是全局变量
				alert("程序员c:" + GLOBAL.a);
			})();
		</script>

		在这里使用了GLOBAL作为全局变量名， 在匿名函数间要传递值的话，将这些变量作为全局变量的属性即可。 <br />
		但GLOBAL是全局变量，它在各个函数间都可以访问到，这很容易让GLOBAL的属性不小心被覆盖掉。 <br />
		解决方案：<br />
		命名空间


	</body>
</html>
```

但是这样的话，如果 B 不小心把 GLOBAL 重新赋值了，那么其他人用的变量就会出错

```html
<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>全局变量GLOBAL中添加定义命名空间的函数</title>

		<script>
			//hash全局变量
			var GLOBAL = {};
			//   str :表示要生成的命名空间，例如:    GLOBAL.A.name  或是     A.name
			GLOBAL.namespace = function(str) {
				var arr = str.split(".");
				var o = GLOBAL;
				var i = (arr[0] == "GLOBAL" ? 1 : 0); //如果str中的第一部分为GLOBAL的话，命名空间从第二个开始计算
				for (; i < arr.length; i++) {
					o[arr[i]] = o[arr[i]] || {};
					o = o[arr[i]];
				}
			}
		</script>

		<script>
            /*
            * @method 功能A:
            * @author 程序员a
            * @connect 1234567
            * @time 2015-01-01
            */
			(function() {
				//程序员a写的代码
				GLOBAL.namespace("A.person"); //程序员a定义了自己的命名空间A,并在Ａ下面定义了子命名空间person
				GLOBAL.A.person.name = "zy";
				GLOBAL.A.person.age = 22;
				alert(GLOBAL.A.person.name + "\t" + GLOBAL.A.person.age);
			})();
		</script>
	</head>

	<body>

		<script>
            /*
            * @method 功能B:
            * @author 程序员b
            * @connect 1234567
            * @time 2015-01-01
            */
			(function() {
				//程序员b写的代码:定义自己的命名空间
				GLOBAL.namespace("B.student"); //程序员a定义了自己的命名空间B,并在B下面定义了子命名空间student
				GLOBAL.B.student.name = "lisi";
				GLOBAL.B.student.age = 33;
				alert(GLOBAL.B.student.name + "\t" + GLOBAL.B.student.age);
			})();
		</script>


		<script>
			(function() {
            /*
            * @method 功能C:
            * @author 程序员c
            * @connect 1234567
            * @time 2015-01-01
            */
				alert("程序员c操作A命名空间下的变量:" + GLOBAL.A.person.name + "\t" + GLOBAL.A.person.age);
				alert("程序员c操作B命名空间下的变量:" + GLOBAL.B.student.name + "\t" + GLOBAL.B.student.age);
			})();
		</script>


		以上体现的就是合理使用命名空间解决变量冲突的问题。

	</body>
</html>
```
