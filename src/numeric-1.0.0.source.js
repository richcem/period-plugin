/**
 * 年限处理插件
 * 
 * useage:
 * 
 *      $("[name^=period-]").numeric({
 *             max: 10,
 *             min: 1
 *       });
 */

(function($) {

    $.numeric = $.numeric || {};

	// configure
	$.numeric.defaults = {
		step: 1,
		max: null,
		min: 1,
		readonly: true,
		theme: 1,
        onChange: null
	};

	/**
	 * 年限数值处理类
	 */
	function Numeric(trigger, conf) {

		var self = this,
			fire = trigger.add(self),
			plus = $('<span class="icon icon-plus"></span>'),
			minus = $('<span class="icon icon-minus"></span>');

		if (conf.readonly) {
			trigger.attr('readonly', true);
		}

		// bind event
        trigger.bind('change.numeric', conf.onChange);
        
		plus.bind('click.numeric', function() {
			self.calc(conf.step);
		});

		minus.bind('click.numeric', function() {
			self.calc(-conf.step);
		});

		// some method
		$.extend(self, {

			/**
			 * 设置数值
			 * 
			 * @param int value
			 */
			calc: function(value) {

				var max = self.get('max'),
					min = self.get('min'),
					val = parseInt(trigger.val(), 10) || min || 0;

				val += value;

				if ((min && val < min) || (max && val > max)) {
					return;
				}

				trigger.val(val).trigger('change.numeric');

				self.render();
			},

			/**
			 * 获取匹配的属性
			 * 
			 * @param string attr max|min
			 * @return int|null
			 */
			get: function(attr) {
				return parseInt(trigger.attr(attr), 10) || conf[attr];
			},

			/**
			 * 设置主题模式
			 * 
			 * @param int mode
			 */
			setTheme: function(mode) {
				switch (mode) {
				case 1:
					trigger.before(minus);
					trigger.after(plus);
					break;

				case 2:
					trigger.before(plus);
					trigger.after(minus);
					break;

				default:
					throw "undefined theme mode.";
				}
			},

			/**
			 * 按钮效果处理
			 */
			render: function() {

				var max = self.get('max'),
					min = self.get('min'),
					val = parseInt(trigger.val(), 10) || min || 0;

				// 触发disable效果
				if (max) {
					plus.toggleClass('icon-plus-disable', val >= max);
				}

				if (min) {
					minus.toggleClass('icon-minus-disable', val <= min);
				}
			}
		});


		// 设置默认值
		if (trigger.val() === "") {
			trigger.val(self.get('min'));
		}

		// 设置主题
		self.setTheme(conf.theme);

		// 
		self.render();
	}

	// 初始化插件
	$.fn.numeric = function(conf) {

		var api = this.data('numeric');
		if (api) {
			return api;
		}

		conf = $.extend(true, {}, $.numeric.defaults, conf);

		this.each(function() {
			api = new Numeric($(this), conf);
			$(this).data('numeric', api);
		});

		return conf.api ? api : this;
	};

})(jQuery);