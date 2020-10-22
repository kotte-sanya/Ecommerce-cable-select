<?php
/**
 * Plugin Name: WP Script Css insert 
 * Plugin URI:
 * Description: WP Script Css insert
 * Author:
 * Author URI:
 * Version: 1.0.0
 *
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Required minimums and constants
 */
define( 'WP_SCRIPT__CSS_VERSION', '1.0.1' );
define( 'WP_SCRIPT__CSS_MAIN_FILE', __FILE__ );
define( 'WP_SCRIPT__CSS_PLUGIN_URL', untrailingslashit( plugins_url( basename( plugin_dir_path( __FILE__ ) ), basename( __FILE__ ) ) ) );
define( 'WP_SCRIPT__CSS_PLUGIN_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );

// phpcs:disable WordPress.Files.FileName


add_action( 'plugins_loaded', 'WP_SCRIPT__CSS_init' );


function WP_SCRIPT__CSS_init() {



    if ( ! class_exists( 'WP_SCRIPT__CSS' ) ) :

        class WP_SCRIPT__CSS {

            /**
             * @var Singleton The reference the *Singleton* instance of this class
             */
            private static $instance;

            /**
             * Returns the *Singleton* instance of this class.
             *
             * @return Singleton The *Singleton* instance.
             */
            public static function get_instance() {
                if ( null === self::$instance ) {
                    self::$instance = new self();
                }
                return self::$instance;
            }

            /**
             * Private clone method to prevent cloning of the instance of the
             * *Singleton* instance.
             *
             * @return void
             */
            private function __clone() {}

            /**
             * Private unserialize method to prevent unserializing of the *Singleton*
             * instance.
             *
             * @return void
             */
            private function __wakeup() {}

            /**
             * Protected constructor to prevent creating a new instance of the
             * *Singleton* via the `new` operator from outside of this class.
             */
            private function __construct() {
                $this->init();
            }

            /**
             * Init the plugin after plugins_loaded so environment variables are set.
             *
             * @since 1.0.0
             * @version 4.0.0
             */
            public function init() {

                register_activation_hook( WP_SCRIPT__CSS_MAIN_FILE, array( $this, 'install' ) );
                add_action( 'wp_enqueue_scripts', array( $this, 'include_scripts' ) );
            }

            public function install() {

            }

            public function include_scripts() {
                wp_enqueue_style('WP_SCRIPT__CSS-css1', WP_SCRIPT__CSS_PLUGIN_URL . '/assets/css/bd-wizard.css', WP_SCRIPT__CSS_VERSION );
                wp_enqueue_script('WP_SCRIPT__CSS-js1', WP_SCRIPT__CSS_PLUGIN_URL . '/assets/js/cableData.js', array('jquery'), WP_SCRIPT__CSS_VERSION, false );
                wp_enqueue_script('WP_SCRIPT__CSS-js1', WP_SCRIPT__CSS_PLUGIN_URL . '/assets/js/bd-wizard.js', array('jquery'), WP_SCRIPT__CSS_VERSION, false );

            }
        }
        WP_SCRIPT__CSS::get_instance();
    endif;
}
