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
                        'background-image': 'url(../images/plane.gif)',
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
                        'background-image': 'url(../images/plane1.gif)',
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
                    //  if(bombleftposition == carLeftPosition){
					
				   console.log('showuld explode now');
				   
				    $('#car').hide('explode', { pieces: 10 }, 500);
					
                    
                     }
              //  }
            }
        },

        bombing: function () {
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
                top: 445,
            },{ duration :5000,
			    step: function(now, fx){
                 console.log('function  step');
				  var bombleftposition = $('.bomb').position().left;
                var bombTopPosition = $('.bomb').position().top;
				 var car_position = $('#car').position();
				var carLeftPosition = car_position.left;
				
            var carwidth = $('#car').width();
            var carTopPosition = car_position.top;
				  if (parseInt(bombTopPosition == carTopPosition) || parseInt(bombTopPosition == (carTopPosition - 5))) {
                    //  if(bombleftposition == carLeftPosition){
					
				   console.log('showuld explode now');
				    $('#car').hide('explode', { pieces: 10 }, 500);
                     }
          }
			}, function () {
			    console.log('call back called');
                $(this).stop().clearQueue();
                $(this).remove();
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
	       console.log('key up');
            Game.car_move('still');
    });
});
 