CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cardora_analytics_event" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"device_type" text,
	"user_agent" text,
	"ip_address" text,
	"referer" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cardora_card_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"card_type" text DEFAULT 'business',
	"collection" text,
	"selected_template_id" text,
	"wedding_date" text,
	"venue" text,
	"bride_name" text,
	"groom_name" text,
	"bride_parent_names" text,
	"groom_parent_names" text,
	"deceased_elders" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "cardora_card_settings_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "cardora_gallery_item" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"template_id" text NOT NULL,
	"slug" text,
	"data" jsonb,
	"downloaded_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cardora_password_reset_token" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "cardora_password_reset_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "cardora_payment" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'CAD' NOT NULL,
	"payment_method" text NOT NULL,
	"stripe_session_id" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"purpose" text NOT NULL,
	"payer_email" text,
	"item_data" jsonb,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cardora_rsvp" (
	"id" text PRIMARY KEY NOT NULL,
	"invite_slug" text NOT NULL,
	"guest_name" text NOT NULL,
	"guest_email" text,
	"phone" text,
	"attending" text NOT NULL,
	"number_of_guests" integer DEFAULT 1 NOT NULL,
	"dietary_restrictions" text,
	"message" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "cardora_user_profile" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"username" text,
	"profession" text,
	"company" text,
	"phone" text,
	"whatsapp" text,
	"address" text,
	"social_links" jsonb DEFAULT '{}'::jsonb,
	"profile_enabled" boolean DEFAULT true NOT NULL,
	"payment_enabled" boolean DEFAULT false NOT NULL,
	"payment_type" text DEFAULT 'flexible',
	"fixed_amount" integer,
	"interac_email" text,
	"theme" text DEFAULT 'default',
	"country" text DEFAULT 'CA',
	"currency" text DEFAULT 'CAD',
	"profile_image" text,
	"card_background_image" text,
	"card_paid" boolean DEFAULT false NOT NULL,
	"invite_paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "cardora_user_profile_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "cardora_user_profile_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "cardora_wedding_invite" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"slug" text NOT NULL,
	"template_id" text NOT NULL,
	"groom_name" text,
	"bride_name" text,
	"wedding_date" text,
	"reception_date" text,
	"venue" text,
	"venue_address" text,
	"story" text,
	"hero_image" text,
	"gallery_images" jsonb DEFAULT '[]'::jsonb,
	"music_url" text,
	"couple_photo" text,
	"background_image" text,
	"wedding_time" text,
	"groom_father_name" text,
	"groom_mother_name" text,
	"bride_father_name" text,
	"bride_mother_name" text,
	"couple_message" text,
	"events" jsonb,
	"extra_data" jsonb,
	"is_paid" boolean DEFAULT false NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "cardora_wedding_invite_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cardora_analytics_event" ADD CONSTRAINT "cardora_analytics_event_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cardora_card_settings" ADD CONSTRAINT "cardora_card_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cardora_gallery_item" ADD CONSTRAINT "cardora_gallery_item_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cardora_payment" ADD CONSTRAINT "cardora_payment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cardora_user_profile" ADD CONSTRAINT "cardora_user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cardora_wedding_invite" ADD CONSTRAINT "cardora_wedding_invite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;