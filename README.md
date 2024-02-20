# Resource Catalog

This app provides a user interface to browse available Resources and their features, with the ability to filter the list for easier browsing.

## Example

```html
<div id="resource_catalog_app"></div>
<script type="module">
  import { renderCatalog } from "https://esm.sh/@xras/resource-catalog@0.1.0";

  renderCatalog({ api_url: "/path/to/catalog.json"});
</script>
```