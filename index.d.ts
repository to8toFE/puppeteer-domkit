import { Page, Browser } from 'puppeteer'
import {Domkit} from './typings/Domkit'

declare var page: Page
declare var browser: Browser

declare var $: Domkit;

export default $