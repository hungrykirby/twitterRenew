var twitter = require('twitter');

var client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.OAUTH_TOKEN,
    access_token_secret: process.env.OAUTH_TOKEN_SECRET
});

var BOT_ID = 'musicReply';
client.stream( 'statuses/filter', { track : '@' + BOT_ID }, function( stream ) {
    // �t�B���^�[���ꂽ�f�[�^�̃X�g���[�����󂯎��A�c�C�[�g�̃e�L�X�g��\������
    stream.on( 'data', function( data ) {
      console.log(data);
        var text = data.text; // �c�C�[�g�̃e�L�X�g
        var textCleaned = text.replace(new RegExp('^@' + BOT_ID + ' '), ''); // �A�J�E���g���͕s�v
        var isMention = (data.in_reply_to_user_id !== null);
        var userId = data.user.screen_name;
        console.log( textCleaned );
        if(!isMention || userId === BOT_ID) return;

        var twMessage = {status: '@' + userId + ' ' + textCleaned};
        client.post('statuses/update', twMessage, function(error, result, response){
          if (!error) {
          } else {
            console.log(error);
          }
        });
    });
});