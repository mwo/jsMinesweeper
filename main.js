function f(a)
{
	var b = 0;
	return function ()
	{
		return b < a.length ?
		{
			done: !1,
			value: a[b++]
		} :
		{
			done: !0
		}
	}
}

function g(a)
{
	if (!(a instanceof Array))
	{
		var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
		a = b ? b.call(a) :
		{
			next: f(a)
		};
		for (var c = []; !(b = a.next()).done;) c.push(b.value);
		a = c
	}
	return a
}
var l = document.getElementById("game"),
	m = document.getElementById("result"),
	n = !0;
Array.prototype.contains = function (a)
{
	for (var b = [], c = 0; c < arguments.length; ++c) b[c - 0] = arguments[c];
	c = JSON.stringify;
	var d = Object.values(this);
	d = c(d);
	arStr = 1 == b.length ? c(b[0]) : c(b);
	return d.includes(arStr)
};

function p()
{
	var a = 0;
	[].concat(g(l.children)).forEach(function (b)
	{
		(b.className.includes("Hidden") || b.className.includes("Highlighted")) && a++
	});
	return a
}

function q(a)
{
	m.innerText = a + " ";
	a = document.createElement("i");
	a.className = "fas fa-redo";
	a.onclick = function ()
	{
		document.location.reload()
	};
	m.appendChild(a)
}

function r(a)
{
	return square = [
		[a[0], a[1] - 1],
		[a[0], a[1] + 1],
		[a[0] - 1, a[1]],
		[a[0] + 1, a[1]],
		[a[0] - 1, a[1] - 1],
		[a[0] + 1, a[1] - 1],
		[a[0] - 1, a[1] + 1],
		[a[0] + 1, a[1] + 1]
	]
}

function t(a)
{
	var b = u,
		c = 0;
	r(a).forEach(function (d)
	{
		b.contains(d) && (c += 1)
	});
	return c
}

function v()
{
	[].concat(g(l.children)).forEach(function (a)
	{
		a.className.includes("Empty") && (a = a.id.split("-").map(function (b)
		{
			return eval(b)
		}), r(a).forEach(function (b)
		{
			(b = document.getElementById(b[0] + "-" + b[1])) && 0 == b.className.includes("c1") && b.className.includes("Hidden") && (b.click(), b.className += " c1")
		}))
	})
}
for (var y = "#FFFFFF #3872D1 #41903E #CB2733 #7903A1 #FF8F02 #02d5ff #ff02e6".split(" "), z = {
		x: 10,
		y: 10
	}, u, A = parseInt("" + (z.x + z.y) / 1.3), B = [], C = 0; C < A; C++)
{
	var D = [Math.floor(Math.random() * z.x), Math.floor(Math.random() * z.y)];
	B.contains(D) ? C-- : B.push(D)
}
u = B;
(function (a, b)
{
	a.forEach(function (c, d)
	{
		c.forEach(function (E, w)
		{
			var h = document.createElement("span");
			b.contains([w, d]);
			h.id = w + "-" + d;
			h.addEventListener("contextmenu", function (e)
			{
				e.preventDefault();
				0 == this.className.includes("Number") && (this.className.includes("Highlighted") ? this.className = this.className.replace("Highlighted", "Hidden") : this.className = this.className.replace("Hidden", "Highlighted"));
				return !1
			}, !1);
			h.onclick = function ()
			{
				if (n && 0 == this.className.includes("Highlighted"))
				{
					var e = this.id.split("-").map(function (k)
					{
						return eval(k)
					});
					u.contains(e) ? (q("Game Over"), n = !1, u.forEach(function (k)
					{
						document.getElementById(k.join("-")).className = "revealed"
					})) : (e = t(e), 0 == e ? this.className = this.className.replace("Hidden", "Empty") : (this.innerText = "" + e, this.className = this.className.replace("Hidden", "Number"), this.style.setProperty("color", y[e])), v(), p() == u.length && (q("Victory"), n = !1, u.forEach(function (k)
					{
						document.getElementById(k.join("-")).className = "revealed"
					})))
				}
			};
			h.className = "Hidden";
			l.appendChild(h)
		});
		var x = document.createElement("span");
		x.innerText = "\n";
		l.appendChild(x)
	})
})(function (a, b)
{
	var c = [].concat(g("_".repeat(b)));
	return c = c.map(function ()
	{
		return [].concat(g("#".repeat(a)))
	})
}(z.x, z.y), u);
