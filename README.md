# Numeric插件说明

**Numeric**是一个jQuery插件，依赖于jQuery-1.4.4以上。该插件使得input元素提供类似于Html5的类型为number的input元素的操作方式。

---

## Usage

 **一般用法**

    	$(':input').numeric();


 **进阶使用**

如果input元素提供max, min等属性元素的值会受到限制。

		<input type="text" max="9" min="1" />

		$(':input').numeric();

## Configure
 
* `max`: 全局最大值
* `min`: 全局最小值
* `step`: 步长
* `theme`: 主题[1|2]
* `readonly`: 是否只读

Happy coding!