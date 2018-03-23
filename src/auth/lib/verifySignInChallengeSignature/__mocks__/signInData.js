const { SIGN_IN_IMPLEMENTATION_TREZOR_V2 } = require('../../../constants/signInImplementations')

const validSignInData = [
  {
    signature: '20f2d1a42d08c3a362be49275c3ffeeaa415fc040971985548b9f910812237bb41770bf2c8d488428799fbb7e52c11f1a3404011375e4080e077e0e42ab7a5ba02',
    publicKey: '023a472219ad3327b07c18273717bb3a40b39b743756bf287fbd5fa9d263237f45',
    challenge: [
      '2015-03-23 17:39:22',
      'cd8552569d6e4509266ef137584d1e62c7579b5b8ed69bbafa4b864c6521e7c2'
    ],
    implementation: SIGN_IN_IMPLEMENTATION_TREZOR_V2
  },
  {
    signature: '208af89fa5165ee2c3c5905a5f1c329862626d8d5c1370b72cbf1991b96b4225406d1a514e3c59cd735cbc7e956faf1629ea7369f53efa93da0bc9f2b19b6e3461',
    publicKey: '029827904c4855abfb873de44b59017fecc18881af43384761a518b1e442a96adb',
    challenge: [
      'Wed, 21 Mar 2018 16:52:04 GMT',
      '4ee5a7ae02f02cd0734d13c8a7ee22ce2854fe5bb72ab5907b9b790ab4ae4464e9be3db9e7a15bf9d1a893d54354324d2256f8a062a842320ee7586e81e669e3'
    ],
    implementation: SIGN_IN_IMPLEMENTATION_TREZOR_V2
  },
  {
    signature: '201d2d110b24e06f2ba74dab246cc8b363c27018ad84e1f4272e72a974b5812d563fefc072210cbc658771aa0d3d38ea0173a03f56dffa6f1d90a1535c247b06f3',
    publicKey: '02eca61b885de1d52a571aa80cfbe73d9c82c4e3c1aa677b172e2803fd388f9286',
    challenge: [
      'Wed, 21 Mar 2018 16:57:11 GMT',
      'b9b31c335db4cd36e887cea6d9be73d710859c2918e41167d09bb77a0f88bc3e75569b1c2c2301ee66c7dc6b1efc894dc53035c9ceb8b9c1a117abbea8f3aec1'
    ],
    implementation: SIGN_IN_IMPLEMENTATION_TREZOR_V2
  }
]

const invalidSignInData = [
  {
    signature: '201d2d110b24e06f2ba74dab246cc8b363c27018ad84e1f4272e72a974b5812d563fefc072210cbc555353aa0d3d38ea0173a03f56dffa6f1d90a1535c247b06f3',
    publicKey: '02eca61b885de1d52a571aa80cfbe73d9c82c4e3c1aa677b172e2803fd388f9286',
    challenge: [
      'Wed, 21 Mar 2018 16:57:11 GMT',
      'b9b31c335db4cd36e887cea6d9be73d710859c2918e41167d09bb77a0f88bc3e75569b1c2c2301ee66c7dc6b1efc894dc53035c9ceb8b9c1a117abbea8f3aec1'
    ],
    implementation: SIGN_IN_IMPLEMENTATION_TREZOR_V2
  },
  {
    signature: '201d2d110b24e06f2ba74dab246cc8b363c27018ad84e1f4272e72a974b5812d563fefc072210cbc658771aa0d3d38ea0173a03f56dffa6f1d90a1535c247b06f3',
    publicKey: '02eca61b885de1d52a571aa80cfbe73d9c82c4e3c1aa677b172e2803fd388f1337',
    challenge: [
      'Wed, 21 Mar 2018 16:57:11 GMT',
      'b9b31c335db4cd36e887cea6d9be73d710859c2918e41167d09bb77a0f88bc3e75569b1c2c2301ee66c7dc6b1efc894dc53035c9ceb8b9c1a117abbea8f3aec1'
    ],
    implementation: SIGN_IN_IMPLEMENTATION_TREZOR_V2
  },
  {
    signature: '201d2d110b24e06f2ba74dab246cc8b363c27018ad84e1f4272e72a974b5812d563fefc072210cbc658771aa0d3d38ea0173a03f56dffa6f1d90a1535c247b06f3',
    publicKey: '02eca61b885de1d52a571aa80cfbe73d9c82c4e3c1aa677b172e2803fd388f9286',
    challenge: [
      'Incorrect visual challenge',
      'b9b31c335db4cd36e887cea6d9be73d710859c2918e41167d09bb77a0f88bc3e75569b1c2c2301ee66c7dc6b1efc894dc53035c9ceb8b9c1a117abbea8f3aec1'
    ],
    implementation: SIGN_IN_IMPLEMENTATION_TREZOR_V2
  },
  {
    signature: '201d2d110b24e06f2ba74dab246cc8b363c27018ad84e1f4272e72a974b5812d563fefc072210cbc658771aa0d3d38ea0173a03f56dffa6f1d90a1535c247b06f3',
    publicKey: '02eca61b885de1d52a571aa80cfbe73d9c82c4e3c1aa677b172e2803fd388f9286',
    challenge: [
      'Wed, 21 Mar 2018 16:57:11 GMT',
      'b9b31c335664cd36e887cea6d9be73d710859c2918e41167d09bb77a0f88bc3e75569b1c2c2301ee66c7dc6b1efc894dc53035c9ceb8b9c1a117abbea8f3aec1'
    ],
    implementation: SIGN_IN_IMPLEMENTATION_TREZOR_V2
  }
]

module.exports = { validSignInData, invalidSignInData }
