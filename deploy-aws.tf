# ==============================================================================
# Terraform Configuration: Deploy Portfolio to AWS S3 & CloudFront
# Candidate: Dolai Rajesh Kumar (DevOps Engineer)
# ==============================================================================

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  description = "AWS deployment region"
  type        = string
  default     = "ap-south-1" # Mumbai region
}

variable "bucket_name" {
  description = "Name for the S3 bucket (must be globally unique)"
  type        = string
  default     = "rajesh-kumar-devops-portfolio-2026"
}

# 1. AWS S3 Bucket for Static Website
resource "aws_s3_bucket" "portfolio" {
  bucket        = var.bucket_name
  force_destroy = true

  tags = {
    Name        = "Dolai Rajesh Kumar Portfolio"
    Environment = "Production"
    ManagedBy   = "Terraform"
    Owner       = "rajeshprabhakar2000@gmail.com"
  }
}

# 2. Configure Bucket Website Configuration
resource "aws_s3_bucket_website_configuration" "portfolio_website" {
  bucket = aws_s3_bucket.portfolio.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# 3. Bucket Ownership Controls
resource "aws_s3_bucket_ownership_controls" "portfolio_ownership" {
  bucket = aws_s3_bucket.portfolio.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

# 4. Public Access Block (Adjust based on CloudFront OAC or Direct Public Access)
resource "aws_s3_bucket_public_access_block" "portfolio_public" {
  bucket = aws_s3_bucket.portfolio.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 5. S3 Bucket Policy allowing Public Read for Static Hosting
resource "aws_s3_bucket_policy" "allow_public_read" {
  bucket     = aws_s3_bucket.portfolio.id
  depends_on = [aws_s3_bucket_public_access_block.portfolio_public]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.portfolio.arn}/*"
      }
    ]
  })
}

# 6. Upload Core Portfolio Assets
locals {
  site_files = {
    "index.html" = "text/html"
    "style.css"  = "text/css"
    "app.js"     = "application/javascript"
    "resume.md"  = "text/markdown"
  }
}

resource "aws_s3_object" "files" {
  for_each     = local.site_files
  bucket       = aws_s3_bucket.portfolio.id
  key          = each.key
  source       = "${path.module}/${each.key}"
  content_type = each.value
  etag         = filemd5("${path.module}/${each.key}")
}

# Outputs
output "website_endpoint" {
  description = "S3 Static Website URL"
  value       = aws_s3_bucket_website_configuration.portfolio_website.website_endpoint
}

output "s3_bucket_name" {
  description = "Portfolio S3 Bucket Name"
  value       = aws_s3_bucket.portfolio.id
}
