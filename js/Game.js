$(document).ready(function () {

    var Game = {
        $car: $('#car'),
        $plane: $('#plane'),
        $background: $('#basic'),
        windowWidth: $(window).innerWidth(),
        windowHight: $(window).height(),
        plan_fly_direction: 'right',
        flyheight: 10,

        plane_fly: function (direction) {
            var plane_position = this.$plane.position();

            this.$plane.css('top', this.flyheight);

            if (direction == 'left') {
                var leftPos = plane_position.left;
                if (leftPos > this.$plane.width()) {
                    var l = leftPos - 10 + 'px';
                    this.$plane.css('left', l);
                } else {
                    this.plan_fly_direction = 'right';
                    this.flyheight = Math.floor(Math.random() * 100) + 10;
                    this.$plane.css({
                        'background-image': 'url(../drive-me/images/plane.gif)',
                        'background-position': '100% 0%'
                    });
                }
            }
            if (direction == 'right') {
                var leftPos = plane_position.left;
                var innerWidthWindow = this.windowWidth;
                var planewidth = 2 * (this.$plane.width());
                if (parseInt(leftPos) < parseInt(innerWidthWindow - planewidth)) {
                    var l = leftPos + 10 + 'px';
                    this.$plane.css('left', l);
                } else {
                    this.$plane.css({
                        'background-image': 'url(../drive-me/images/plane1.gif)',
                        'background-position': '0% 0%'
                    });
                    this.plan_fly_direction = 'left';
                    this.flyheight = Math.floor(Math.random() * 100) + 10;
                }
            }
        },

        car_move: function (direction) {
            var bombExists = false;
            if ($('.bomb').length != 0) {
                bombExists = true;
            }
            if (bombExists) {
                var bombleftposition = $('.bomb').position().left;
                var bombTopPosition = $('.bomb').position().top;
            }

            var car_position = this.$car.position();
            var carLeftPosition = car_position.left;
            var carwidth = this.$car.width();
            var carTopPosition = car_position.top;
            /******** when left key pressed   *****/
            if (direction == 'left') {
                if (carLeftPosition > carwidth) {
                    var l = carLeftPosition - 10 + 'px';
                    this.$car.css('left', l);
                }
            }

            /******** *******************  *****/

            /******** when right key pressed   *****/
            if (direction == 'right') {
                var innerWidthWindow = this.windowWidth;
                var carWidth = 2 * (carwidth);
                if (parseInt(carLeftPosition) < parseInt(innerWidthWindow - carWidth)) {
                    var l = carLeftPosition + 10 + 'px';
                    this.$car.css('left', l);
                }
            }
            /******** *******************  *****/

            /******** exploding for all , right and left or still  *****/
            if (bombExists) {
                console.log('top ', bombTopPosition);
                console.log('left ', bombleftposition);
                if (parseInt(bombTopPosition == carTopPosition) || parseInt(bombTopPosition == (carTopPosition - 5))) {
                    $('#car').hide('explode', {
                        pieces: 10
                    }, 500);
                }

            }
        },

        bombing: function () {


            var car_position = this.$car.position();
            var carLeftPosition = car_position.left;
            var carwidth = this.$car.width();
            var carTopPosition = car_position.top;
            var self = this;
            if ($('.bomb').length) {
                return;
            }
            var plane_position = self.$plane.position();
            var $bomb = $('<div/>', {
                'class': 'bomb',
                'css': {
                    'left': ((plane_position.left) + 15) + 'px',
                    'top': (plane_position.top + 35) + 'px'
                }
            });
            $('#basic').append($bomb);
            $('.bomb').animate({
                top: 490
            }, {

                duration: 15000,

                step: function (now, fn) {
                    var bombleftposition = $('.bomb').position().left;
                    var bombTopPosition = $('.bomb').position().top;
					var bombWidth = $('.bomb').width();
					//console.log(bombWidth);
					var bombHeight = $('.bomb').height();
                    if (self.plan_fly_direction == 'right') {
                        $(this).css({
                            "background-color": "orange",
                            "left": ((bombleftposition) + 1) + 'px',
                            "top": (bombTopPosition + 1) + 'px' //,
							/*"width" : (parseFloat(bombWidth) + 0.025) + 'px',
							"height" : (bombHeight + 0.025) + 'px' */
                        });
                    } else {
                        $(this).css({
                            "background-color": "orange",
                            "left": ((bombleftposition) - 1) + 'px',
                            "top" : (bombTopPosition + 1) + 'px'//,
						/*	"width" : (parseFloat(bombWidth) + 0.025) + 'px',
							"height" : (bombHeight + 0.025) + 'px' */
                        });

                    }

					var bombWidth = $('.bomb').width();


                    if ((now>=430) && (now<490)) {
                        $(this).css({
                            "background-color": "red"
                        }

                        );
                    }

					 if (bombTopPosition == carTopPosition){
					     $('#car').remove();


					     $('#car').css({
                            "background-color": "yellow"
							}
                        );
							$(this).stop().clearQueue();
                    $(this).remove();
						}

					 else {
					if(now==490){

					$(this).stop().clearQueue();
                    $(this).remove();


					}

						 if($('#car').length){
						    console.log('still exists');
						 }else{
						    $('#plane').after($('<div/>', {
                'id': 'car',
                'css': {
						'z-index' : '3',
						'position' : 'absolute',
						'left' : '100px',
						'top' : '455px',
						'background' : 'transparent url(../drive-me/images/car.png) no-repeat',
						'width' : '112px',
						'height' : '45px'
                },
				complete : function() {  alert('complete');    }

            }));

			    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            Game.car_move('left');
        } else if (e.keyCode == 39) {
            Game.car_move('right');
        }
    });

    $(document).keyup(function (e) {
        console.log('key up after removing');
        Game.car_move('still');
    });

			}
					}
                   // console.log('step function');
                },

                /* queue : false ,  */
                callback: function () {
                    console.log('call back called');

                }
            });
        }
    };

    setInterval(function () {
        Game.plane_fly(Game.plan_fly_direction);
        Game.bombing();
    }, 100);

    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            Game.car_move('left');
        } else if (e.keyCode == 39) {
            Game.car_move('right');
        }
    });

    $(document).keyup(function (e) {
        Game.car_move('still');
    });
});