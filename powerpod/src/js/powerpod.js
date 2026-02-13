import {
  ApplicationPaths,
  ClaimPaths,
  Form,
  HomePaths,
  MyEfpWorkbooksPaths,
  Page,
  POWERPOD,
  win,
  WorkbookPaths,
} from './common/constants.js';
import { getOptions, setOption, setOptions } from './common/options.js';
import './common/scripts.js';
import './common/fetch.js';
import './common/env.ts';
import { Logger } from './common/logger.js';
import './components/EFPBreadcrumbs.ts';
import { initMyEfpWorkbooks } from './pages/myEfpWorkbooks.js';
import { initWorkbook } from './workbook/workbook.js';

const logger = Logger('powerpod');

export default function powerpod(options) {
  // try to autodetect the form type if not passed
  if (!options?.form) {
    const { pathname: path } = window.location;
    if (WorkbookPaths.some((workbookPath) => path.includes(workbookPath))) {
      logger.info({ message: `auto-detected ${Form.Workbook} form` });
      setOption('form', Form.Workbook);
    } else if (ClaimPaths.some((claimPath) => path.includes(claimPath))) {
      logger.info({ message: `auto-detected ${Form.Claim} form` });
      setOption('form', Form.Claim);
    } else if (ApplicationPaths.some((appPath) => path.includes(appPath))) {
      logger.info({ message: `auto-detected ${Form.Application} form` });
      setOption('form', Form.Application);
    } else if (MyEfpWorkbooksPaths.some((myEfpPath) => path.includes(myEfpPath))) {
      logger.info({ message: `auto-detected ${Page.MyEfpWorkbooks} page` });
      setOption('page', Page.MyEfpWorkbooks);
    } else if (HomePaths.some((appPath) => path.includes(appPath))) {
      logger.info({ message: `auto-detected ${Page.Home} page` });
      setOption('page', Page.Home);
    } else {
      logger.warn({
        message: `Unable to autodetect form type, path: ${path}`,
      });
    }
  }

  if (localStorage.getItem('debug_pp')) {
    setOption('debugging', true);
    window.debug_pp = true;
  }

  if (localStorage.getItem('debug_canadapost')) {
    setOption('debug_canadapost', true);
    window.debug_canadapost = true;
  }

  // combine given options and default options
  setOptions(options);

  logger.info({ message: 'setting up API with options:', data: getOptions() });
  setAPI();

  // if (window?.location?.search?.includes('&msg=success')) {
  //   logger.warn({
  //     message: `ABORT initialization... success page detected, hide loader if displayed.`,
  //   });
  //   hideLoadingAnimation();
  //   // @ts-ignore
  //   return window.powerpod;
  // }

  switch (getOptions().form) {
    case Form.Application:
      logger.info({ message: `initializing ${Form.Application}` });
      initApplication();
      break;
    case Form.Claim:
      logger.info({ message: `initializing ${Form.Claim}` });
      initClaim();
      break;
    case Form.Workbook:
      logger.info({ message: `initializing ${Form.Workbook}` });
      initWorkbook();
      break;
    default:
      // If no form type is defined, check for page type
      switch (getOptions().page) {
        case Page.MyEfpWorkbooks:
          logger.info({ message: `initializing ${Page.MyEfpWorkbooks} page` });
          initMyEfpWorkbooks();
          break;
        default:
          logger.warn({
            message: 'init with no form or page type defined in options',
          });
          break;
      }
      break;
  }

  // @ts-ignore
  return window.powerpod;
}

function setAPI() {
  // @ts-ignore
  POWERPOD.getPowerpodData = function () {
    return {
      options: getOptions(),
    };
  };
  // @ts-ignore
  POWERPOD.version = '5.0.7';
  // @ts-ignore
  window.powerpod = POWERPOD;
}
