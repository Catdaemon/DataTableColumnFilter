# DataTableColumnFilter
A simple but powerful column filtering plugin for DataTables

# Why
Because the built in search is great, but I wanted this per-column but without spamming inputs everywhere in the footer etc. Also, being able to filter out specific things is nice.

# What does it look like?
Something like this:
![https://i.imgur.com/XncuAYw.png](https://i.imgur.com/XncuAYw.png)

# Usage
Initialisation is easy and there are no settings.
```javascript
$("table").DataTable();
$("table").dataTableAdvFilter();
```

# CSS
You'll want some CSS to go with it, here's some to get you started:
```css
/* table filters */
div.dtFilters {
    display: block;
    position: absolute;
    border: 1px solid #ddd;
    background: #fff;
    padding: 1em;
    max-height: 300px;
    overflow-y: scroll;
    border-radius: 4px;
    box-shadow: 1px 4px 5px rgba(0,0,0,0.25);
}
div.dtFilters ul
{
    list-style-type: none;
    padding:0;
    margin:0;
}
div.dtFilters li+li.heading {
    margin-top: 1em;
}
div.dtFilters li.heading {
    color: #777;
}
a.dtFilter
{
    color: #ddd;
    position: absolute;
    right: 8px;
    bottom: 7px;
}
```
