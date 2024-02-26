import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ResourceCatalog from "./components/ResourceCatalog";
import styles from './styles/app.scss?inline';

const renderCatalog = ({
    api_url,
    excluded_categories,
    excluded_filters,
    allowed_categories,
    allowed_filters
  }) => {
  const container = document.getElementById("resource_catalog_app");
  const root = ReactDOM.createRoot(container);

  root.render(
    <Provider store={store}>
      <div className='container' id='resource_catalog_app'>
        <ResourceCatalog
          api_url={api_url}
          excluded_categories={excluded_categories}
          excluded_filters={excluded_filters}
          allowed_categories={allowed_categories}
          allowed_filters={allowed_filters}
        />
      </div>
      <style>{styles}</style>
    </Provider>
  );
}

export {
  renderCatalog
}