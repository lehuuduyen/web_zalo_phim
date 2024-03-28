<?php

/**
 * Plugin Name: Woo_rotation_lucky
 * Plugin URI: https://www.yourwebsiteurl.com/
 * Description: This is the very first plugin I ever created.
 * Version: 1.0
 * Author: WOO_rotation_lucky
 * Author URI: http://yourwebsiteurl.com/
 **/

defined('ABSPATH') or die('Hey, you can\t access this file, you silly human!');

if (is_admin()) {
  new Woo_Rotation_Lucky();
}

class Woo_Rotation_Lucky
{
  public $plugin_path;
  public $plugin_url;

  public function __construct()
  {
    $this->plugin_path = plugin_dir_path(dirname(__FILE__, 1)) . 'woo_rotation_lucky';
    $this->plugin_url = plugin_dir_url(dirname(__FILE__)) . 'woo_rotation_lucky';
    add_action('admin_menu', array($this, 'themeslug_enqueue_style'));
    add_action('admin_menu', array($this, 'add_menu_option'));
  }

  function themeslug_enqueue_style()
  {
    wp_enqueue_style('add_rotation_lucky_style', $this->plugin_url . '/assets/styles/rotation_lucky-styles.css');
    wp_enqueue_script('add_rotation_lucky_script', $this->plugin_url . '/assets/scripts/rotation_lucky-scripts.js');
  }

  public function add_menu_option()
  {
    $this->plugin_option();
  }

  public function plugin_option()
  {
    add_menu_page('Cấu hình vòng quay', 'Cấu hình vòng quay', 'manage_options', 'vong-quay',  array($this, 'admin_template'));
  }

  function admin_template()
  {
    return require_once("$this->plugin_path/templates/admin.php");
  }
}
function plugin_setup_db2()
{
  // Function change serialized
  set_time_limit(-1);
  global $wpdb;
  try {
    if (!function_exists('dbDelta')) {
      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    }
  


    $ptbd_table_name = $wpdb->prefix . 'woo_history_user_commission';
    if ($wpdb->get_var("SHOW TABLES LIKE '" . $ptbd_table_name . "'") != $ptbd_table_name) {
      dbDelta("SET GLOBAL TIME_ZONE = '+07:00';");
      $sql  = 'CREATE TABLE ' . $ptbd_table_name . '(
          id BIGINT AUTO_INCREMENT,
          user_id BIGINT NOT NULL,
          total_order INT NOT NULL,
          order_id INT NULL,
          commission INT DEFAULT 0,
          commission_level2 INT DEFAULT 0,
          minimum_spending INT  NULL,
          date VARCHAR(255)  NULL,
          month VARCHAR(255)  NULL,
          year VARCHAR(255)  NULL,
          payment_method TEXT  NULL,
          status INT DEFAULT 1, 
          create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP  ,

                  PRIMARY KEY(id))';
      //status =1 (them) =2  (tru)
      dbDelta($sql);
    }
  } catch (\Exception $ex) {
  }
}

function active_plugin2()
{
  flush_rewrite_rules();
  plugin_setup_db2();
}

register_activation_hook(__FILE__, 'active_plugin2');


function rotation_lucky_update_wc_order_status_function($order_id, $order) {
  // Check if the order type is 'shop_order'

  if ($order->get_type() === 'shop_order') {
      global $wpdb;
      $prefix = $wpdb->prefix;
      $history = $wpdb->get_results("SELECT * FROM ".$prefix."woo_history_user_commission WHERE (order_id = '".$order_id."' AND status = '3')");
      if($history){
          $id= $history[0]->id;
          $wpdb->query($wpdb->prepare("UPDATE ".$prefix."woo_history_user_commission SET status=1 WHERE id=$id"));
      }
      // Your custom code to update something based on the WooCommerce order status change

  }
}
add_action('woocommerce_order_status_completed', 'rotation_lucky_update_wc_order_status_function', 10, 4);