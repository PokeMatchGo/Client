$(document).ready(function () {
    if (localStorage.getItem('token')) {
        $('#homepagePoke').show()
        $('#login-form').hide()
        $('#register-form').hide()
    } else {
        $('#homepagePoke').hide()
        checkLoginNew()
    }
});

function checkLoginNew() {
    $('#login-form').show()
    $('#register-form').hide()
}


let flaging = false
function checkLoginNew() {
    if (!flaging) {
        $('#login-form').show()
        $('#register-form').hide()
        buttonSub()
    } else {
        $('#login-form').hide()
        $('#register-form').show()
        buttonSub()
    }
}


function buttonSub() {
    flaging ? flaging = false : flaging = true
}



















// UI POKE
//<![CDATA[
$(document).ready(function () {
    pokemonUI.init();
});
//]]>


$(document).ready(function () {
    $(".roundedBucket div.thumbList:last-child").css('margin-bottom', '0');
});

//<![CDATA[
// Register post-authentication callback for homepage polls (PCOM-2316)
pokemonUI.options.authCallbacks.push(function (data) {
    if (data.is_authenticated) {
        polls.userLoggedIn();
    } else {
        polls.userNotLoggedIn();
    }
});

$(document).ready(function () {

    var cookie = {
        set: function (name, value, days) {
            var expires,
                date = new Date();

            if (days) {
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toGMTString();
            } else {
                expires = '';
            }

            document.cookie = name + '=' + value + expires + '; path=/';
        },

        get: function (name) {
            var nameEQ = name + '=',
                ca = document.cookie.split(';'),
                c, i = 0,
                ii = 0;

            for (i = 0, ii = ca.length; i < ii; i++) {
                c = ca[i];

                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        },

        destroy: function (name) {
            this.set(name, '', -1);
        }
    };
    // Embed flash pieces :

    // var homeFeature = {
    //     config: {
    //         src: rootVirtual + "swf/features/PmFeatureHomeShell.swf",
    //         wmode: 'transparent',
    //         allowscriptaccess: 'always'
    //     },
    //     flashvars: {
    //         appFile: rootVirtual + 'swf/features/PmFeatureHomeApp.swf',
    //         configFile: '/us/_hpc.xml',
    //         dynamicTextPath: rootVirtual + 'swf/features/PmFeatureTVText.swf'
    //     }
    // };

    var homeFlashCallout = {
        config: {
            src: 'http://assets6.pokemon.com/assets/cms/swf/homepage/top_right/home_topright_shiny_distro_us.swf',
            wmode: 'opaque'
        }
    };

    // var marquee = {
    //     config: {
    //         src: rootVirtual + "swf/MarqueeApplication.swf",
    //         wmode: 'transparent',
    //         allowscriptaccess: 'always'
    //     },
    //     flashvars: {
    //         xmlPath: "/us/_mc.xml",
    //         countryCode: "us",
    //         langFilePath: "http://assets20.pokemon.com/static/us/marquee/language.xml"
    //     }
    // };

    $('div#header').append('<div id="flashMarquee"></div><div id="flashMask"></div>');
    $('div#homeFlash-1').flashembed(homeFeature.config, homeFeature.flashvars);
    $('div#homeFlashCallout').flashembed(homeFlashCallout.config);
    $('div#flashMarquee').flashembed(marquee.config, marquee.flashvars);
    /* Get avatars asynchronously */
    $.ajax({
        url: '/us/avatar-gallery/',
        success: function (data) {
            if (/avatar-gallery-async/i.test(data)) {
                $('#userProfileGallery').html(data);
                AvatarSlider.init({
                    target: $('div#userProfileGallery')
                });
                pokemonUI._createFlexBox();
                pokemonUI._replaceFonts();
            } else {
                $('h3#galleryOfUserProfiles').hide();
            }
        }
    });
    polls.initialize();
});
//]]>

if (!NREUMQ.f) {
    NREUMQ.f = function () {
        NREUMQ.push(["load", new Date().getTime()]);
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.src = (("http:" === document.location.protocol) ? "http:" : "https:") + "//" +
            "js-agent.newrelic.com/nr-100.js";
        document.body.appendChild(e);
        if (NREUMQ.a) NREUMQ.a();
    };
    NREUMQ.a = window.onload;
    window.onload = NREUMQ.f;
};
NREUMQ.push(["nrfj", "beacon-4.newrelic.com", "ba34eb72cb", "1087113,1087114",
    "MgFaZkVVWBBXABIPWAtLfkdZV0IKWQ1JC1YMChZTR0QYFV8GERUZBgtNXENGTxBTDwMFQ18IWVxTXVgE", 0, 329,
    new Date().getTime(), "", "", "", "", ""
]);