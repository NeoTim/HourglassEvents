<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrdersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('orders', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('customer_id');
			$table->integer('dtype_id');
			$table->integer('dmethod_id');
			$table->integer('truck_id');
			$table->integer('position');
			$table->string('number');
			$table->string('title');
			$table->string('start');
			$table->string('est_delivery');
			$table->string('freight');
			$table->string('tracking');
			$table->string('instructions');
			$table->string('backgroundColor');
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('orders');
	}

}
