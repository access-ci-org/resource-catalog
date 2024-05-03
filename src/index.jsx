import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ResourceCatalog from "./components/ResourceCatalog";
import appStyles from './styles/app.scss?inline';
import bootstrapStyles from './styles/bootstrap.scss?inline';

const renderCatalog = ({
    api_url,
    excluded_categories,
    excluded_filters,
    allowed_categories,
    allowed_filters,
    disable_bootstrap
  }) => {
  const container = document.getElementById("resource_catalog_app");
  let root;
  if (disable_bootstrap) {
    root = ReactDOM.createRoot(container);
  } else {
    const shadow = container.attachShadow({ mode: "open" });
    root = ReactDOM.createRoot(shadow);
  }

  const bootstrapDisabled = disable_bootstrap ? disable_bootstrap : false;

  root.render(
    <Provider store={store}>
      <div className='container'>
        <ResourceCatalog
          api_url={api_url}
          excluded_categories={excluded_categories}
          excluded_filters={excluded_filters}
          allowed_categories={allowed_categories}
          allowed_filters={allowed_filters}
        />
      </div>
      {bootstrapDisabled ? '' : <style>{bootstrapStyles}</style>}
      <style>{appStyles}</style>
    </Provider>
  );
}

export {
  renderCatalog
}