# Resource Catalog

This app provides a user interface to browse available Resources and their features, with the ability to filter the list for easier browsing.

## Example

```html
<div id="resource_catalog_app"></div>
<script type="module">
  import { renderCatalog } from "https://esm.sh/@xras/resource-catalog";

  renderCatalog({
    api_url: "/path/to/catalog.json",
    allowed_categories: [],
    allowed_filters: [],
    excluded_categories: [],
    excluded_filters: [],
    disable_bootstrap: false
  });
</script>
```

### Options
| Option  | Values | Required |
| ---     | ---    | ---      |
| `api_url` | The URL for your Resource Catalog | **True** |
| `allowed_categories` | A list of filter **categories** that you want displayed. Ex: `["Resource Type", "Specialized Hardware"]` | **False** |
| `allowed_filters` | A list of filters you want users to see. Ex: `["GPU Compute"]` | **False** |
| `excluded_categories` | A list of filter **categories** that you want hidden from users. Ex: `["Specialized Support", "Specialized Hardware"]` | **False** |
| `excluded_filters` | A list of filters that you want hidden from users. Ex: `["ACCESS Allocated", "ACCESS OnDemand"]`  | **False** |
| `disable_bootstrap` | If your site uses [Bootstrap](https://getbootstrap.com/) and you don't want this app to overwrite your styles, add this parameter.  | **False** |

Note: Avoid combining `allowed_categories` and `excluded_categories`, or `allowed_filters` and `excluded_filters`. If an invalid combination is found, it will default to what is specified in the `allowed_*` options
