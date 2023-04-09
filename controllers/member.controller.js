const Member = require('../models/member.model.js')

const createError = require('../utils/createError.js')

const createMember = async (req, res, next) => {
    const newMember = new Member({
        suffix: req.body.suffix,

        first_name: req.body.first_name,
        last_name: req.body.last_name,
        Ministry: req.body.Ministry,
        dob: req.body.dob,
        member_function: req.body.member_function,
        dateCreated: req.body.dateCreated,
    })
    try {
        const savedMember = await newMember.save()
        return res.status(200).json({
            message: 'Member has been created successfully',
            data: savedMember,
        })
    } catch (err) {
        return next(err)
    }
}

const deleteAllMembers = async (req, res, next) => {
    try {
        await Member.deleteMany({})
        return res.json({ message: 'All members deleted successfully' })
    } catch (err) {
        return next(err)
    }
}

const deleteMember = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id)

        await Member.findByIdAndDelete(member)
        return res.json({ message: 'User deleted successfully' })
    } catch (err) {
        return next(err)
    }
}

const getAllMembers = async (req, res, next) => {
    try {
        const data = await Member.find({})
        return res.status(200).json({
            message: 'success',
            data,
        })
    } catch (err) {
        return next(err)
    }
}

const getcurrentMember = async (req, res, next) => {
    try {
        const data = await Member.findById(req.params.id)

        return res.status(200).json({ message: 'success', data })
    } catch (err) {
        return next(err)
    }
}

const updateMember = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id).exec()

        if (!member) {
            return next(
                createError({ status: 404, message: ' Member not found' })
            )
        }

        const updatedMember = await Member.findByIdAndUpdate(
            req.params.id,
            {
                suffix: req.body.suffix,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                Ministry: req.body.Ministry,
                dob: req.body.dob,
                member_function: req.body.member_function,
            },
            { new: true }
        )

        return res.status(200).json({
            message: 'User has been updated succesfully',
            data: updatedMember,
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    getAllMembers,
    getcurrentMember,
    deleteAllMembers,
    deleteMember,
    updateMember,
    createMember,
}
