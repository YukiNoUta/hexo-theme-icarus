/* global hexo */
const logger = require('hexo-log')();

/**
 * Print welcome message
 */
logger.info(`===================================
Shiraha's Blog - Powered by Hexo & Icarus
=========================================`);

logger.info(`♥ Made by Nanami with love ♥`);

/**
 * Check if all dependencies are installed
 */
require('../include/dependency')(hexo);

/**
 * Configuration file checking and migration
 */
require('../include/config')(hexo);

/**
 * Register Hexo extensions and remove Hexo filters that could cause OOM
 */
require('../include/register')(hexo);
