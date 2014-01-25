


                    
                    $(document).ready(function(){

                        // set the correct startup theme
                        var theme = window.location.hash;
                        if(theme.length > 0){
                            $('#theme-current').html( $('#theme-selector a[href="'+theme+'"]').html());
                            $('#preview').attr('src', $('#theme-selector a[href="'+theme+'"]').data('url'));
                            $('#theme-selector').data('theme-name', theme);
                            setupColorSwitcher(theme.substr(1));
                        }

                        // Change theme
                        $('#theme-selector a').click(function(){
                            $('#theme-current').html( $(this).html());


                            var domainName = 'http://bootstrapstyler.com//preview';
                            var templateName = $(this).attr('href').substr(1);
                            window.history.pushState(templateName, $(this).html(), domainName+"/");
                            $('#theme-selector').data('theme-name', '#'+templateName);
                            $('#preview').attr('src', $(this).data('url'));

                            setupColorSwitcher(templateName);

                            return true;
                        });

                        // change color
                        $('#color-selector a').live( 'click', function(){
                            var color = $(this).data('color');
                            var templateName = $('#theme-selector').data('theme-name').substr(1);
                            var timestamp =  +(new Date());

                            // Remove all color stylesheet
                            $('#preview').contents().find('head link[href*="http://bootstrapstyler.com//preview/_/'+templateName+'/css/styler/color/"]').remove();

                            // append new color stylesheet
                            $('#preview').contents().find('head').append('<link href="http://bootstrapstyler.com//preview/_/'+templateName+'/css/styler/color/'+color+'.css?'+ timestamp +'" rel="stylesheet" />');
                            return true;
                        });
                    });

                    var buffer = 0; //scroll bar buffer
                    var iframe = document.getElementById('preview');

                    function setupColorSwitcher(themeName){

                        // Show color switcher if necessary
                        var colors = $('#theme-selector a[href="#'+themeName+'"]').data('colors');
                        if(colors != null && colors.length > 0){
                            // remove all items and add actual ones
                            $('ul#color-selector').empty();
                            colors = colors.split(',');
                            $.each(colors, function(key, color) {
                                $('ul#color-selector').append('<li><a class="btn '+color+'" data-color="'+color+'"></a></li>')
                            });
                            $('li.colors').show();
                        } else {
                            $('li.colors').hide();
                        }
                    }

                    function pageY(elem) {
                        return elem.offsetParent ? (elem.offsetTop + pageY(elem.offsetParent)) : elem.offsetTop;
                    }

                    function resizeIframe() {
                        var height = document.documentElement.clientHeight;
                        height -= pageY(document.getElementById('preview'))+ buffer ;
                        height = (height < 0) ? 0 : height;
                        document.getElementById('preview').style.height = height + 'px';
                    }

                    // .onload doesn't work with IE8 and older.
                    if (iframe.attachEvent) {
                        iframe.attachEvent("onload", resizeIframe);
                    } else {
                        iframe.onload=resizeIframe;
                    }

                    window.onresize = resizeIframe;


                    function resizeToDesktop(e){
                        //$('#preview').width( $(window).width() ).css( 'margin-left', 0 );
                        $('li a.active').removeClass('active');
                        $(e).addClass('active');
                        $('#preview').animate({
                            'margin-left': 0,
                            width: $(window).width()
                          }, 750, function() {
                            // Animation complete.
                          });
                    }

                    function resizeToTablet(e){
                        //$('#preview').width( 767 ).css( 'margin-left', ($(window).width() - 767 )/2);
                        $('li a.active').removeClass('active');
                        $(e).addClass('active');
                        $('#preview').animate({
                            'margin-left': ($(window).width() - 767 )/2,
                            width: '767'
                          }, 700, function() {
                            // Animation complete.
                          });
                    }

                    function resizeToMobile(e){
                        //$('#preview').width( 480 ).css( 'margin-left', ($(window).width() - 480 )/2);
                        $('li a.active').removeClass('active');
                        $(e).addClass('active');
                        $('#preview').animate({
                            'margin-left': ($(window).width() - 480 )/2,
                            width: '480'
                          }, 700, function() {
                            // Animation complete.
                          });
                    }
            