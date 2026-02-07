import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js"; // Added to fetch user email
import { sendEmail } from "../utils/nodemailer.js"; // Make sure to create this util

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        const job = await Job.findById(jobId).populate('company');
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        // EMAIL NOTIFICATION LOGIC
        const user = await User.findById(userId);
        if (user && user.email) {
            const subject = `Application Received: ${job.title}`;
            const message = `Hi ${user.fullname},\n\nYou have successfully applied for the ${job.title} position at ${job.company.companyName}. We will review your application and get back to you soon!\n\nBest Regards,\nJob Portal Team`;
            
            // Background lo mail velthundi, user experience slow avvakunda
            sendEmail(user.email, subject, message);
        }
        
        return res.status(201).json({
            message: "Job applied successfully. Confirmation email sent.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application || application.length === 0) {
            return res.status(404).json({
                message: "No Applications found.",
                success: false
            })
        };
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            })
        };

        const application = await Application.findOne({ _id: applicationId }).populate({
            path: 'applicant',
            select: 'email fullname'
        }).populate({
            path: 'job',
            select: 'title'
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        application.status = status.toLowerCase();
        await application.save();

        // STATUS UPDATE EMAIL
        if (application.applicant && application.applicant.email) {
            const subject = `Job Application Update: ${application.job.title}`;
            const message = `Hi ${application.applicant.fullname},\n\nYour application status for ${application.job.title} has been updated to: ${status.toUpperCase()}.\n\nCheck your dashboard for more details.`;
            
            sendEmail(application.applicant.email, subject, message);
        }

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}