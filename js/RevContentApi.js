/**
 * Created by ilan on 27/07/16.
 */
(function () {


    var revContentApi = Object.create(null, {

        //init the Object by Overload The
        init: {
            value: function () {
                this.methods.getAccessToken(1, 1, 1, revContentApi);
            },
            writable: true,
            enumerable: true,

        },

        //all the method
        methods: {
            value: {

                /*INITIAL ACCCES TO THE ACCOUNT*/
                /**
                 *
                 * @param grand_type
                 * @param client_id
                 * @param client_secret
                 */
                getAccessToken: function (grand_type, client_id, client_secret) {
                    this.access = ajax.Request('POST',
                        'https://api.revcontent.io/oauth/token',
                        {'Content-type': 'application/x-www-form-urlencoded'},
                        {
                            'grant_type': grand_type,
                            'client_id': client_id,
                            'client_secret': client_secret
                        });
                },


                /*GET LIST OF ALL BOOSTS*/

                /**
                 *
                 * @param targeting_type
                 * @param status
                 * @param enabled
                 * @param date_from
                 * @param date_to
                 * @param limit
                 * @param offset
                 */

                getListBoosts: function (targeting_type, status, enabled, date_from, date_to, limit, offset) {
                    this.listBoosts = ajax.Request('GET',
                        'https://api.revcontent.io/stats/api/v1.0/boosts',
                        {
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + this.access.access_token
                        },
                        {
                            'targeting_type': targeting_type || '',
                            'status': status || '',
                            'enabled': enabled,
                            'date_form': date_from || '',
                            'date_to': date_to || '',
                            'limit': limit || '',
                            'offset': offset || ''
                        });
                },

                /*GET ALL THE CONTENT FOR CURRENT ACCOUNT AND THE STATISTICS FOR THE GIVEN TIME PERIOD.*/

                /**
                 *
                 * @param date_from
                 * @param date_to
                 */

                getAllContent: function (date_from, date_to) {
                    this.content = ajax.Request('GET',
                        'https://api.revcontent.io/stats/api/v1.0/boosts/content',
                        {
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + this.access.access_token
                        },
                        {
                            'date_from': date_from,
                            'date_to': date_to
                        }
                    );
                },

            },
            writable: true,
            enumerable: true,
        },
    })

    var ajax = Object.create(null, {

        /*GENERIC AJAX REQUEST*/
        Request: {
            value: function (method, url, headers, parameters) {
                $.ajax({
                    method: method,
                    dateType: 'jsonp',
                    url: url,
                    headers: headers,
                    data: parameters,
                    crossDomain: true,
                    complete: function (data) {
                        return data;
                    },
                    error: function () {
                        throw "there was an error with the request please try again";
                    }
                })
            },
            writable: true,
            enumerable: true,
        }
    })

    window.rCa = revContentApi;
}());
