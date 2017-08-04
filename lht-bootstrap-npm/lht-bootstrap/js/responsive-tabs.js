;
(function(doc, undefined) {

  var wrapper = '.nav-tabs-responsive';
  var reFlow = function(init, wrapper) {
    var tabsets = document.querySelectorAll(wrapper);
    for (a = 0; a < tabsets.length; ++a) {
      var tabset = tabsets[a];
      var dropdownMenu = tabset.querySelector('ul.dropdown-menu');
      dropdownMenu.innerHTML = "";

      var wrapper_width = tabset.offsetWidth;
      var dropdown_width = tabset.querySelector("li.dropdown").offsetWidth;
      width_sum = 0;

      var lis = tabset.querySelectorAll("li:not([class^='dropdown'])");

      for (i = 0; i < lis.length; ++i) {
        // Initialize width, because hidden elements do not have a width later
        if (init) {
          lis[i].savedWidth = lis[i].offsetWidth;
        }

        width_sum += lis[i].savedWidth;

        if (width_sum + dropdown_width + 2 > wrapper_width) {

          lis[i].style.display = "none";
          lis[i].classList.add("tab-hidden");

          var clonedNode = lis[i].cloneNode(true);
          clonedNode.style.display = "block";
          clonedNode.remove("tab-hidden");
          dropdownMenu.appendChild(clonedNode);

        } else {

          lis[i].style.display = "block";
          lis[i].classList.remove("tab-hidden");

        }
      }

      var hidden_lists = tabset
        .querySelectorAll("li[class='tab-hidden']");

      if (hidden_lists.length > 0) {
        tabset.querySelector("li.dropdown").style.visibility = "visible";
      } else {
        tabset.querySelector("li.dropdown").style.visibility = "hidden";
      }

      tabset.querySelector("li.dropdown").classList.add("pull-right");
    }
  };

  document.addEventListener('DOMContentLoaded', function() {

    reFlow(true, wrapper);
    window.addEventListener('resize', function() {

      reFlow(false, wrapper);
    });

  });
})(document);
