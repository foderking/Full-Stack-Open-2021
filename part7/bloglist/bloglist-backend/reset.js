


const User = require('./models/user')

const func = async () =>
{


    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('ope', 6)
    const initial = {	initial: {
		'username': 'ope',
		'name': 'ope'
	}, passwordHash}
    const user = await new User(initial)

    await user.save()
 }
 

 func()