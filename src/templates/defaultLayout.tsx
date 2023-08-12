import {
  ContainerReflection,
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
  RenderTemplate,
} from 'typedoc';
import { classNames, getDisplayName } from './utils';

export const defaultLayout = (
  context: DefaultThemeRenderContext,
  template: RenderTemplate<PageEvent<Reflection>>,
  props: PageEvent<ContainerReflection>,
) => {
  const pageTitle = props.model.isProject()
    ? getDisplayName(props.model)
    : `${getDisplayName(props.model)} | ${getDisplayName(props.project)}`;
    const pageDescription = 'Documentation for ' + props.project.name;
  return (
    <html class="default" 
    lang={context.options.getValue('htmlLang')}
    itemScope="" itemType="https://schema.org/Article">
      <head>
        <meta charSet="utf-8" />
        {context.hook('head.begin')}
        <meta http-equiv="x-ua-compatible" content="IE=edge" />
        <title>
          {pageTitle}
        </title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta itemProp="name" content={pageTitle}/>
        <meta itemProp="description" content={pageDescription} />
        <meta name="subject" content="Software Documentation" />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow"/>
        <meta name="generator" content="TypeDoc"/>

        {context.options.getValue('media') && (
          <>
            <link rel="icon" href={context.relativeURL('media/favicon.ico', true)}/>
            <meta name="msapplication-config" content={context.relativeURL('media/browserconfig.xml', true)}/>
            <link rel="manifest" href={context.relativeURL('media/manifest.json', true)}/>
            <link rel="apple-touch-icon" href={context.relativeURL('media/icons/apple-touch-icon-180x180.png', true)} />
            <link rel="mask-icon" href={context.relativeURL('media/icons/safari-pinned-tab.svg')} />
          </>
        )}
        
        <link rel="stylesheet" href={context.relativeURL('assets/highlight.css', true)} />
        <link rel="stylesheet" href={context.relativeURL('assets/style.css')} />
        
        {context.options.getValue('customCss') && (
          <link rel="stylesheet" href={context.relativeURL('assets/custom.css', true)} />
        )}
        
        <link rel="stylesheet" href={context.relativeURL('assets/base.css', true)} />

        <script defer src={context.relativeURL('assets/main.js', true)}></script>
        <script
          async
          src={context.relativeURL('assets/search.js', true)}
          id="search-script"
        ></script>
        
        {context.hook('head.end')}
      </head>
      <body>
        {context.hook('body.begin')}
        <script>
          <JSX.Raw html='document.documentElement.dataset.theme = localStorage.getItem("tsd-theme") || "os"' />
        </script>
        {context.toolbar(props)}
        <div
          class={classNames({
            container: true,
            'container-main': true,
          })}
        >
          <div class="col-content">
            {context.hook('content.begin')}
            {context.header(props)}
            {template(props)}
            {context.hook('content.end')}
          </div>
          <div class="col-sidebar">
            <div class="page-menu">
              {context.hook('pageSidebar.begin')}
              {context.pageSidebar(props)}
              {context.hook('pageSidebar.end')}
            </div>
            <div class="site-menu">
              {context.hook('sidebar.begin')}
              {context.sidebar(props)}
              {context.hook('sidebar.end')}
            </div>
          </div>
        </div>

        {context.footer()}

        <div class="overlay"></div>

        {context.analytics()}
        {context.hook('body.end')}
      </body>
    </html>
  );
};
