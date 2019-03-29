import { Page, Browser } from 'puppeteer';
import { Domkit } from './Domkit';
import ZeptoStatic from './$Z';
declare var page: Page;
declare var browser: Browser;

declare var $: Domkit;
declare var $Z: ZeptoStatic;

export default $;
