###关于javascript中的prototype __proto__ this new等操作的一些思考
>今天在看前端早读课的文章，发现了下面这个方法，很疑惑，也很不理解。回来自己稍稍折腾了一发，直接看例子！
  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <script>
        Function.prototype.bind = function(oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5
                // internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function() {},
                fBound = function() {
                    return fToBind.apply(this instanceof fNOP ? this : oThis || this,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };

        function foo(){
            this.a = arguments[0];
        }

        var obj = {};

        var afterBind = foo.bind(obj);
        afterBind(1);
        console.log(obj.a); // 1

        var abObj = new afterBind(2);
        console.log(abObj.a); // 2

    </script>
</body>
</html>
```

###问题
>
         fNOP.prototype = this.prototype;
         fBound.prototype = new fNOP();
         这两句注释之后abObj.a变成了undefined？obj.a==2 why？


###答案
>debug之后 发现这两句话会影响 line:20 "this instanceof fNOP" 的结果
没有这两句话的话this instanceof fNOP结果一直为false
PS: (第一次调用的时候this==window，第二次操作的时候this是afterBind创建的临时变量，他们的原型链中都不存在fNOP的prototype属性)， 也就是说我们操纵的一直都是oThis，也就是说我们一直在给obj对象中的变量赋值
这也就理解了bind的仿照实现为什么有这两行代码，我们要区分对bind返回的对象（方法，类）进行了什么操作，是默认全局调用还是new了一个新的对象，这两者在执行过程中的this值是不同的，这是关注点，对于理解javascript对象和this是有一些帮助的，很好！！！

###另外
>new操作都做了什么，举个栗子：
var a = new A();
1. var a = {};
2. a.__proto__ = A.prototype (a instanceof A is true)
3. A.call(a)

>CSDN上看到的解释，感觉应该没有问题，按这样理解也是说的通的，改天看看高程怎么说的


>读万卷书，不如行万里路。写代码的还是要折腾折腾的，fighting！！！