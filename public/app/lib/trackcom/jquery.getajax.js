jQuery.extend
    (
        {
            getVariables: function(url) 
            {
                var result = [];
                $.ajax(
                    {
                        url: url,
                        type: 'get',
                        cache: false,
                        async: false,
                        success: function(data) 
                        {
                            result = data;
                        }
                    }
                );
               return result;
            }
        }
    );