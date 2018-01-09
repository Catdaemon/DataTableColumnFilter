(function($) {
    // Search column for selected checkbox values
    function _columnSearchMulti(column, parent)
    {
        let values = [];
        parent.find("input[type='checkbox']:checked").each(function() {
            var val = $(this).data("value");
            if (val == undefined)
                return;
            values.push(val);
        });

        let regex = values.length > 0 ? values.join("|") : "valueunlikelytooccur";
        column.search(regex, true, false, true).draw();

        console.log(regex);
    }

    $.fn.dataTableAdvFilter = function(options) {
        // Add a class to the table for later reference
        this.addClass("dtFilter");
        var dt = $(this).DataTable();

        // Get columns and add functionality to each
        var columns = dt.columns();

        for (let i = 0; i < columns.count(); i++)
        {
            let column = dt.column(i);
            let header = column.header();
            
            // Filter column data to unique values
            let unique = column.data().filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });

            // Sort items
            unique = unique.sort(function (a, b) {
                return a.localeCompare(b);
            });

            // Create filter elements
            let filterContainer = $("<div class='dtFilters'>");
            let filterButton = $("<a class='dtFilter'><i class='glyphicon glyphicon-filter'></i></a>");
            let valueFilters = $("<ul></ul>");

            // Text search box
            let searchBox = $("<input type='text'></input>");
            valueFilters.append("<li class='heading'>Search Values</li>");
            valueFilters.append($("<li></li>").append(searchBox));            

            // Checkboxes
            valueFilters.append("<li class='heading'>Select Values</li>");
            let selectAll = $("<input type='checkbox' checked> ");
            valueFilters.append($("<label></label>").append(selectAll).append("Select All"));

            // One checkbox for each unique value
            for (let x = 0; x < unique.count(); x++)
            {
                let item = unique[x];
                let filter = $("<li></li>");
                let label = $("<label></label>");
                let input = $("<input type='checkbox' checked> ");
                input.data("value", item);
                label.append(input);
                filter.append(label);
                label.append(item);
                valueFilters.append(filter);

                // Search on change
                input.on('change', function() {
                    _columnSearchMulti(column, valueFilters);
                });
            }

            // Interaction
            // Handle clicks
            filterContainer.hide();
            filterButton.on('click', function(e) {
                filterContainer.css("top", filterButton.offset().top + filterButton.height());
                filterContainer.css("left", filterButton.offset().left);
                filterContainer.show();
                e.stopPropagation();
            });
            $(document).on('click', function(e) {
                if (filterContainer.has(e.target).length === 0) {
                    filterContainer.hide();
                }
            });

            // Text search box
            searchBox.on('keyup change', function() {
                var boxval = $(this).val();

                // Hide checkboxes not matching the entered string
                valueFilters.find("label").each(function() {
                    if ($(this).text().toLowerCase().includes(boxval) || boxval == "")
                    {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                });

                // Check boxes based on their visibility
                valueFilters.find("input[type='checkbox']").each(function() {
                    $(this).prop('checked', $(this).is(":visible"));
                });

                // Do table search
                _columnSearchMulti(column, valueFilters);
            });

            // Select all
            selectAll.on('change', function() {
                valueFilters.find("input[type='checkbox']:visible").prop('checked', $(this).is(":checked"));
                _columnSearchMulti(column, valueFilters);
            });

            // Add items to page
            filterContainer.append(valueFilters);
            $(header).append(filterButton);
            $("body").append(filterContainer);
        }
    };
})(jQuery);
